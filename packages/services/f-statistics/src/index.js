/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';

export default class StatisticsClient {
    constructor (justLogInstance, options = {}, basePayload = {}) {
        this.configuration = {
            ...defaultOptions,
            ...options
        };

        this.basePayload = {
            ...basePayload,
            je_feature: 'f-statistics',
            je_logType: 'client-stats',
            je_feature_for: this.configuration?.featureName || 'Unspecified',
            je_environment: this.configuration?.environment || 'Unspecified'
        };

        this.justLogInstance = justLogInstance;
    }

    publish (message, statisticPayload) {
        this.justLogInstance.info(message, {
            ...statisticPayload,
            ...this.basePayload
        });
    }
}
