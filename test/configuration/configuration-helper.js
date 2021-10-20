const { CIRCLECI, JE_ENV } = process.env;
const fileName = CIRCLECI ? 'circleci' : 'local';
const video = require('wdio-video-reporter');

exports.getTestConfiguration = () => require(`./${fileName}.config.js`);

exports.getUrlForEnvironment = () => {
    switch (JE_ENV) {
        case 'browserstack':
            return 'http://bs-local.com:3000';
        case 'local':
            return 'http://localhost:8080';
        default:
            throw new Error(`Sorry, ${JE_ENV} is not recognised.`);
    }
};

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
    let browserstackName = `Local - ${new Date().toLocaleTimeString()}`;

    /**
     * Check if we're running on a TeamCity agent,
     * so we can set the Browserstack build name.
     */

    if (CIRCLECI) {
        const buildNumber = process.env.CIRCLE_BUILD_NUM;

        browserstackName = `CircleCI - ${buildNumber}`;
    }

    return browserstackName;
};

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
