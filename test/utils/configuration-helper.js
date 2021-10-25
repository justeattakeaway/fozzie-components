const { CIRCLECI, TEST_TYPE } = process.env;
const chromeSettings = require('../configuration/chrome/chrome.settings').default();
const environmentSettings = CIRCLECI ? require('../configuration/ci.test-settings').default() : require('../configuration/local.test-settings').default();

exports.getConfigurationSettings = () => {
    const runnerSettings = chromeSettings;
    const testCapabilities = runnerSettings[TEST_TYPE.toLowerCase()].capabilities;

    return {
        capabilities: testCapabilities,
        bail: environmentSettings.bail,
        logLevel: environmentSettings.logLevel,
        maxInstances: environmentSettings.maxInstances,
        baseUrl: runnerSettings.baseUrl,
        reporters: runnerSettings.reporters,
        services: runnerSettings.services
    };
};
