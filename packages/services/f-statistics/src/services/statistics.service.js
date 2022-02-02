/* eslint-disable camelcase */
import defaultOptions from '../defaultOptions';
import statisticsModule from '../store/statistics.module';

// TODO: move to defaultOption
const BATCH_QUEUE_MAX_BYTES = 1000;
const BATCH_QUEUE_SIZE = 5;

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

    publishBasedOnNumber () {
        if (this.#logs.length >= BATCH_QUEUE_SIZE) this.#publishLogs();
    }

    #publishBasedOnTime () {
        this.#publishLogs();
    }

    publishBasedOnByteSize () {
        const queueByteSize = new Blob([JSON.stringify([...this.#logs])]).size;
        if (queueByteSize >= BATCH_QUEUE_MAX_BYTES) this.#publishLogs();
    }

    // eslint-disable-next-line class-methods-use-this
    #publishLogs () {
        // TODO: cancel time
        // TODO: call just log etc
        // this.#logs.forEach(({ message, payload }) => {
        //     justLog.info(message, {
        //         ...payload
        //     });
        // });

        // this.#store.dispatch(`${this.#configuration.namespace}/clearLogs`);
    }

    publish (message, statisticPayload) {
        const log = this.#makeLog(message, statisticPayload);
        this.#store.dispatch(`${this.#configuration.namespace}/addLog`, log);
        if (!this.#publishIntervalTimer) {
            setInterval(this.#publishBasedOnTime.bind(this), 10000);
        }
        this.publishBasedOnByteSize();
        this.publishBasedOnNumber();
    }
}
