const CIRCLE_CI = process.env.CIRCLECI.toLowerCase();

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
    switch (CIRCLE_CI) {
        case true:
            return exports.ci();
        case false:
            return exports.local();
        default:
            throw new Error(`Sorry, ${TEST_TYPE} is not recognised.`);
    }
};