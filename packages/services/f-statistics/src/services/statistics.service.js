/* eslint-disable camelcase */
import defaultOptions from '../defaultOptions';
import statisticsModule from '../store/statistics.module';

export default class StatisticsService {
    #configuration;
    #justLogInstance;
    #basePayload;
    #store;
    #publishIntervalTimer;

    constructor (justLogInstance, options = {}, basePayload = {}, store) {
        this.#configuration = {
            ...defaultOptions,
            ...options
        };
        this.#basePayload = this.#makeBasePayload(basePayload);
        this.#justLogInstance = justLogInstance;
        this.#store = store;
        this.#store.registerModule(this.#configuration.namespace, statisticsModule, { preserveState: !!store.state[`${this.#configuration.namespace}`] });
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

    #makeLog (message, statisticPayload) {
        return {
            message,
            payload: {
                ...statisticPayload,
                ...this.#basePayload
            }
        };
    }

    get #logs () {
        return this.#store.state[`${this.#configuration.namespace}`].logs;
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

    #makeJustLogFunction ({ message, payload }) {
        return () => this.#justLogInstance.info(message, {
            ...payload
        });
    }

    #publishLogs () {
        clearInterval(this.#publishIntervalTimer);
        this.#logs.map(log => this.#makeJustLogFunction(log))
            .forEach(justLog => justLog());
        this.#store.dispatch(`${this.#configuration.namespace}/clearLogs`);
    }

    publish (message, statisticPayload) {
        const log = this.#makeLog(message, statisticPayload);
        this.#store.dispatch(`${this.#configuration.namespace}/addLog`, log);
        this.#publishBasedOnTime();
        this.#publishBasedOnByteSize();
        this.#publishBasedOnNumber();
    }
}

