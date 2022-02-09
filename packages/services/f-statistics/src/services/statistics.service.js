/* eslint-disable camelcase */
import defaultOptions from '../defaultOptions';

export default class StatisticsService {
    #configuration;
    #logger;
    #basePayload;
    #logs = [];
    #publishIntervalTimer = null;

    constructor (logger, options = {}, basePayload = {}) {
        this.#configuration = {
            ...defaultOptions,
            ...options
        };
        this.#basePayload = this.#makeBasePayload(basePayload);
        this.#logger = logger;
    }

    #makeBasePayload (basePayload) {
        return {
            ...basePayload,
            je_feature: 'f-statistics',
            je_logType: 'client-stats',
            je_feature_for: this.#configuration?.featureName || 'Unspecified',
            je_environment: this.#configuration?.environment || 'Unspecified'
        };
    }

    #createLog (message, statisticPayload) {
        return {
            message,
            payload: {
                ...statisticPayload,
                ...this.#basePayload
            }
        };
    }

    #publishBasedOnNumber () {
        if (this.#logs.length >= this.#configuration.logsMaxLength) this.#publishLogs();
    }

    #publishBasedOnTime () {
        if (!this.#publishIntervalTimer && this.#configuration.logsIntervalTimer !== 0) {
            this.#publishIntervalTimer = setInterval(this.#publishLogs.bind(this), this.#configuration.logsIntervalTimer);
        }
    }

    #publishBasedOnByteSize () {
        const queueByteSize = new Blob([JSON.stringify([...this.#logs])]).size;
        if (queueByteSize >= this.#configuration.logsMaxByteSize) this.#publishLogs();
    }

    #createLogFunction ({ message, payload }) {
        return () => this.#logger.info(message, {
            ...payload
        });
    }

    #publishLogs () {
        clearInterval(this.#publishIntervalTimer);
        this.#publishIntervalTimer = null;
        this.#logs.map(log => this.#createLogFunction(log))
            .forEach(justLog => justLog());
        this.#logs = [];
    }

    publish (message, statisticPayload) {
        const log = this.#createLog(message, statisticPayload);
        this.#logs.push(log);
        this.#publishBasedOnTime();
        this.#publishBasedOnByteSize();
        this.#publishBasedOnNumber();
    }
}

