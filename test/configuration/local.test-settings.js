const video = require('wdio-video-reporter');
const { ALLURE_REPORTER } = process.env;

const settings = () => ({
    bail: 0,
    loglevel: 'info',
    maxinstances: 1,
    reporters: ALLURE_REPORTER === 'true' ? [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
            outputDir: `${global.baseDir}/test/results/allure`
        }],
        ['allure', {
            outputDir: `${global.baseDir}/test/results/allure`,
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            disableMochaHooks: true
        }]
    ] : []
});

exports.default = settings;
