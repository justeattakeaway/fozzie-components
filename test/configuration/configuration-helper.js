const { CIRCLECI, JE_ENV } = process.env;
const fileName = CIRCLECI ? 'circleci' : 'local';
const video = require('wdio-video-reporter');
const { browserstackSettings, chromeSettings } = require('./shared.config');

exports.getTestConfiguration = () => require(`./${fileName}.config.js`);

exports.getUrlForEnvironment = () => {
    const url = JE_ENV === 'local' ? 'http://localhost:8080' : 'http://bs-local.com:3000';

    return url;
};

exports.getConfigurationSettings = () => {
    const settings = JE_ENV === 'local' ? browserstackSettings : chromeSettings;

    return settings;
};

// exports.getSettingsForEnvironment = () => {
//     switch (JE_ENV) {
//         case 'browserstack':
//             return browserstackSettings();
//         case 'local':
//             const chromedriver = {
//                 args: [],
//                 headless: false,
//                 path: '/'
//             };
//             return chromedriver;
//         default:
//             throw new Error(`Sorry, ${JE_ENV} is not recognised.`);
//     }
// };

// const chromeSettings = require('./chrome/chrome.settings').default();
// const browserstackSettings = require('./browserstack/browserstack.settings').default();

// const environmentSettings = CIRCLECI ? require('./ci.test-settings').default() : require('./local.test-settings').default();

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

exports.setBrowserStackBuildName = () => {
    /**
     * Check if we're running on a Circle CI agent,
     * so we can set the Browserstack build name.
     */
    const browserstackName = CIRCLECI ? `CircleCI - ${process.env.CIRCLE_BUILD_NUM}` : `Local - ${new Date().toLocaleTimeString()}`;

    return browserstackName;
};

// exports.getSettingsForEnvironment = () => {
//     switch (JE_ENV) {
//         case 'browserstack':
//             return browserstackSettings();
//         case 'local':
//             return chromeSettings();
//         default:
//             throw new Error(`Sorry, ${JE_ENV} is not recognised.`);
//     }
// };

exports.setTestServices = configuration => [
    ...[JE_ENV !== 'browserstack' ? ['chromedriver', {
        args: [].concat(configuration.availableServices.chromedriver.args)
    }] : []],
    ...[JE_ENV === 'browserstack' ? ['browserstack', { browserstackLocal: true }] : []]
].filter(service => service.length !== 0);

exports.setTestReporters = configuration => [
    ...[configuration.testReporters.includes('video') ? [video, {
        saveAllVideos: false, // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        outputDir: configuration.availableReporters.allure.outputDir // Use same outputDir, so videos are shown in allure
        // outputDir: `${global.baseDir}/test/results/allure/failure-videos`
    }] : []],
    ...[configuration.testReporters.includes('allure') ? ['allure', {
        outputDir: configuration.availableReporters.allure.outputDir,
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
    }] : []],
    ...[configuration.testReporters.includes('junit') ? ['junit', {
        outputDir: `${global.baseDir}/test/results/ci`,
        outputFileFormat: options => `${options.cid}-${options.capabilities.browserName}-results.xml`
    }] : []]
].filter(reporter => reporter.length !== 0);
