const video = require('wdio-video-reporter');
const CIRCLE_CI = process.env.CIRCLECI;
const TEST_TYPE = process.env.TEST_TYPE;

exports.local = () => ({
    bail: 0,
    maxinstances: 1,
    loglevel: 'info',
    reporters: [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
            outputDir: `${global.baseDir}/_results_`
        }],
        ['allure', {
            outputDir: `${global.baseDir}/allure-results`,
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }],
    ]
});

exports.ci = () => ({
    bail: 1,
    maxinstances: process.env.WDIO_MAX_INSTANCES || 2,
    loglevel: process.env.WDIO_LOG_LEVEL || 'info',
    reporters: [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
            outputDir: `${global.baseDir}/_results_`
        }],
        ['allure', {
            outputDir: `${global.baseDir}/allure-results`,
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }],
        ['junit', {
            outputDir: `${global.baseDir}/test/ci`,
            outputFileFormat: function(options) { // optional
                return `${options.cid}-${options.capabilities.browserName}-results.xml`
            }
        }]
    ]
});

exports.a11y = () => ({
    specs: [`${global.baseDir}/test/specs/accessibility/axe-accessibility.spec.js`]
});

exports.component = () => ({
    specs: [`${global.baseDir}/test/specs/component/*.component.spec.js`]
});

exports.setTestEnvironment = () => (CIRCLE_CI ? exports.ci() : exports.local());
exports.setTestType = () => (TEST_TYPE === 'component' ? exports.component() : exports.a11y());
