const video = require('wdio-video-reporter');
const { COMPONENT_TYPE, JE_ENV } = process.env;
const LOCAL_EXECUTION = JE_ENV === 'local';

const settings = () => ({
    bail: 0,
    loglevel: 'info',
    maxinstances: 1,
    reporters: LOCAL_EXECUTION && COMPONENT_TYPE === 'organism' ? [
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
        }
    ]] : []
});

exports.default = settings;
