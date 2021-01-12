const CIRCLE_CI = process.env.CIRCLECI;

exports.local = () => ({
    bail: 0,
    reporters: [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3 // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],
        ['allure', {
            outputDir: '../../../../allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ]
});

exports.ci = () => ({
    bail: 1,
    reporters: null
});

exports.setTestType = () => {
    return CIRCLE_CI ? exports.ci() : exports.local();
};
