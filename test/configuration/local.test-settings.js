const { JE_ENV } = process.env;
const { COMPONENT_TYPE } = process.env;

const settings = () => ({
    baseUrl: 'http://localhost:8080',
    bail: 0,
    loglevel: 'info',
    maxinstances: 1,
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
        }
    ]] : []
});

exports.default = settings;
