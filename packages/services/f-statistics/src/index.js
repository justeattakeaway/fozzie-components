/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';
import statisticsModule from './store/statistics.module';

export default class StatisticsClient {
    #configuration;
    #justLogInstance;
    #basePayload;
    #store;
    #batchIntervalTimer;

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

    publish (message, statisticPayload) {
        const log = this.#makeLog(message, statisticPayload);
        this.#store.dispatch(`${this.#configuration.namespace}/addToPublishQueue`, { log, justLog: this.#justLogInstance });
    }
}
