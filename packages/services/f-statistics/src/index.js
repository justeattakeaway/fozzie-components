/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';

export default class StatisticsClient {
    basePayload = {
        je_feature: 'f-statistics',
        je_logType: 'client-stats'
    };

    constructor (justLogInstance, options = {}, basePayload = {}) {
        this.configuration = {
            ...defaultOptions,
            ...options
        };

        this.basePayload = {
            ...basePayload,
            ...this.basePayload,
            je_feature_for: this.configuration?.featureName || 'Unspecified',
            je_environment: this.configuration?.environment || 'Unspecified'
        };

        this.justLogInstance = justLogInstance;
    }

    publish (message, statisticPayload) {
        this.justLogInstance.info(message, {
            ...this.basePayload,
            ...statisticPayload
        });
    }
}
