const { CIRCLECI, JE_ENV, TEST_TYPE } = process.env;
const chromeSettings = require('../configuration/chrome/chrome.settings').default();
const browserstackSettings = require('../configuration/browserstack/browserstack.settings').default();
const environmentSettings = CIRCLECI ? require('../configuration/ci.test-settings').default()
: require('../configuration/local.test-settings').default()


exports.getConfigurationSettings = () => {

    let runnerSettings = null;
    let testCapabilities = null;

    switch (JE_ENV.toLowerCase()) {
        case 'local':
            runnerSettings = chromeSettings;
            break;
        case 'browserstack':
            runnerSettings = browserstackSettings;
            break;
        default:
            throw new Error(`JE_ENV value: ${JE_ENV} is not valid. Use 'local' or 'browserstack'.`);

    }

    switch(TEST_TYPE.toLowerCase()) {
        
        case 'a11y':
            testCapabilities = runnerSettings.a11y.capabilities;
            break;
        case 'component':
            testCapabilities = runnerSettings.component.capabilities;
            break;
        case 'visual':
            testCapabilities = runnerSettings.visual.capabilities;
            break;
    }


    return {
        capabilities: testCapabilities,
        bail: environmentSettings.bail,
        logLevel: environmentSettings.logLevel,
        maxInstances: environmentSettings.maxInstances, 
        baseUrl: runnerSettings.baseUrl,
        reporters: runnerSettings.reporters,
        services: runnerSettings.services,
    }
};
