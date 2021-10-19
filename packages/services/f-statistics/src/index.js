/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';

export default class StatisticsClient {
    basePayload = {
        je_feature: 'f-statistics',
        je_logType: 'client-stats'
    };

    constructor (justLogInstance, options = {}, basePayload = {}) {
        this.basePayload = {
            ...basePayload,
            ...this.basePayload
        };

        this.configuration = {
            ...defaultOptions,
            ...options
        };

        this.justLogInstance = justLogInstance;
    }

    publish (message, payload) {
        this.justLogInstance.info(message, {
            je_feature_for: this.configuration?.featureName || 'Unspecified',
            je_environment: this.configuration?.environment || 'Unspecified',
            ...this.basePayload,
            ...payload
        });
    }
}
