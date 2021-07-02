import defaultOptions from './defaultOptions';
import configureJustLog from './justLogConfiguration';

let _configuration;
let _justLogInstance;

const publish = payload => {
    console.log('Publish'); // eslint-disable-line

    _justLogInstance.info('test', {
        statClient: `${_configuration.featureName} - f-statistics`,
        ...payload
    });
};

export default (options = {}) => {
    _configuration = {
        ...defaultOptions,
        ...options
    };

    if (!_configuration.loggingEndpointUri) {
        throw new Error('Logging endpoint not configured for f-statistics');
    }

    _justLogInstance = configureJustLog(_configuration);

    return {
        publish
    };
};
