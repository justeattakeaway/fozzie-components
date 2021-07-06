/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';
import configureJustLog from './justLogConfiguration';

let _configuration;
let _justLogInstance;

const publish = (message, payload) => {
    _justLogInstance.info(message, {
        je_feature_for: _configuration.featureName,
        je_logType: 'client-stats',
        je_feature: 'f-statistics',
        je_environment: _configuration.environment,
        ...payload
    });
};

export default (options = {}) => {
    _configuration = {
        ...defaultOptions,
        ...options
    };

    if (!_configuration.endpointUri) {
        throw new Error('Logging endpoint not configured for f-statistics');
    }

    _justLogInstance = configureJustLog(_configuration);

    return {
        publish
    };
};
