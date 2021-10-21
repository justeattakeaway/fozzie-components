// const { CIRCLECI, JE_ENV, TEST_TYPE } = process.env;
// const chromeSettings = require('../configuration/chrome/chrome.settings').default();
// const browserstackSettings = require('../configuration/browserstack/browserstack.settings').default();
// const environmentSettings = CIRCLECI ? require('../configuration/ci.test-settings').default()
// : require('../configuration/local.test-settings').default()
// const isLocal = JE_ENV === 'local';

// exports.getConfigurationSettings = () => {

//     let runnerSettings = isLocal ? chromeSettings : browserstackSettings;
//     let testCapabilities = runnerSettings[TEST_TYPE.toLowerCase()].capabilities;

//     return {
//         capabilities: testCapabilities,
//         bail: environmentSettings.bail,
//         logLevel: environmentSettings.logLevel,
//         maxInstances: environmentSettings.maxInstances, 
//         baseUrl: runnerSettings.baseUrl,
//         reporters: runnerSettings.reporters,
//         services: runnerSettings.services,
//     }
// };
