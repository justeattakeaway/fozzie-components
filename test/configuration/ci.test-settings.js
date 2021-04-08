const video = require('wdio-video-reporter');

const settings = () => ({
    baseUrl: 'http://localhost:8080',
    bail: 1,
    loglevel: process.env.WDIO_LOG_LEVEL || 'info',
    maxinstances: parseInt(process.env.WDIO_MAX_INSTANCES) || 2,
    reporters: [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
            outputDir: `${global.baseDir}/test/results/allure/failure-videos`
        }],
        ['allure', {
            outputDir: `${global.baseDir}/test/results/allure`,
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }],
        ['junit', {
            outputDir: `${global.baseDir}/test/results/ci`,
            outputFileFormat: function (options) { // optional
                return `${options.cid}-${options.capabilities.browserName}-results.xml`;
            }
        }]
    ]
});

exports.default = settings;
