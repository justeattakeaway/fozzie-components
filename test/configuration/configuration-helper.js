const { CIRCLECI } = process.env;
const video = require('wdio-video-reporter');

const fileName = CIRCLECI ? 'circleci' : 'local';

exports.getTestConfiguration = () => require(`./${fileName}.config.js`);

exports.setTestReporters = configuration => [
    ...[configuration.testReporters.includes('video') ? [video, {
        saveAllVideos: false, // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        outputDir: configuration.availableReporters.allure.outputDir // Use same outputDir, so videos are shown in allure
    }] : []],
    ...[configuration.testReporters.includes('allure') ? ['allure', {
        outputDir: configuration.availableReporters.allure.outputDir,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
    }] : []],
    ...[configuration.testReporters.includes('junit') ? ['junit', {
        outputDir: `${global.baseDir}/test/results/ci`,
        outputFileFormat: options => `${options.cid}-${options.capabilities.browserName}-results.xml`
    }] : []]
].filter(reporter => reporter.length !== 0);
