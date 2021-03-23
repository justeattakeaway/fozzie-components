const video = require('wdio-video-reporter');

const CIRCLE_CI = process.env.CIRCLECI;
const { TEST_TYPE } = process.env;
const { JE_ENV } = process.env;
const { COMPONENT_TYPE } = process.env;

exports.getBaseUrl = (port = 8080) => {
    switch (JE_ENV) {
        case 'local':
            return `http://localhost:${port}/`;
        case 'browserstack':
            return `http://bs-local.com:${port}/`;
        default:
            throw new Error(`Sorry, ${JE_ENV} is not recognised.`);
    }
};

exports.local = () => ({
    bail: 0,
    maxinstances: 1,
    loglevel: 'silent',
    reporters: JE_ENV !== 'browserstack' && COMPONENT_TYPE === 'organism' ? [
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
        }]] : []
});

exports.ci = () => ({
    bail: 1,
    maxinstances: parseInt(process.env.WDIO_MAX_INSTANCES) || 2,
    loglevel: process.env.WDIO_LOG_LEVEL || 'silent',
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

exports.a11y = () => ({
    specs: [`${global.baseDir}/test/specs/accessibility/axe-accessibility.spec.js`]
});

exports.component = () => ({
    specs: [`${global.baseDir}/test/specs/component/*.component.spec.js`]
});

exports.setTestEnvironment = () => (CIRCLE_CI ? exports.ci() : exports.local());
exports.setTestType = () => (TEST_TYPE === 'component' ? exports.component() : exports.a11y());
