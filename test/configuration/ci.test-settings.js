//const video = require('wdio-video-reporter');

const settings = () => ({
    bail: 1,
    loglevel: process.env.WDIO_LOG_LEVEL || 'info',
    maxinstances: parseInt(process.env.WDIO_MAX_INSTANCES) || 2,
    reporters: [
        // Ignore for now. - Not sure why this causes failures
        // [video, {
        //     saveAllVideos: false, // If true, also saves videos for successful test cases
        //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        //     outputDir: `${global.baseDir}/test/results/allure/failure-videos`
        // }],
        ['junit', {
            outputDir: `${global.baseDir}/test/results/ci`,
            outputFileFormat: function (options) { // optional
                return `${options.cid}-${options.capabilities.browserName}-results.xml`;
            }
        }]
    ]
});

exports.default = settings;
