/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';

export default class StatisticsClient {
    constructor (justLogInstance, options = {}) {
        this.configuration = {
            ...defaultOptions,
            ...options
        };

        this.justLogInstance = justLogInstance;
    }

    publish (message, payload) {
        this.justLogInstance.info(message, {
            je_feature: 'f-statistics',
            je_feature_for: this.configuration?.featureName || 'Unspecified',
            je_logType: 'client-stats',
            je_environment: this.configuration?.environment || 'Unspecified',
            ...payload
        });
    }
}
