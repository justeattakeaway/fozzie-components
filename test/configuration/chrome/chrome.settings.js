// Used to determine if tests are being run through VS Code debugger.
// If true, only run the file being debugged.
const { ALLURE_REPORTER, SPEC_FILE, VS_DEBUGGER } = process.env;
const video = require('wdio-video-reporter');

const settings = () => ({
    baseUrl: 'http://localhost:8080',
    a11y: {
        capabilities: [
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                specs: VS_DEBUGGER ? [SPEC_FILE] : [
                    'test/accessibility/axe-accessibility.spec.js'
                ]
            }
        ]
    },
    component: {
        capabilities: [
            ...(isDesktop || isShared ? [{
                browserName: 'chrome',
                acceptInsecureCerts: true,
                specs: VS_DEBUGGER ? [SPEC_FILE] : [
                    'test/component/*.component.desktop.spec.js',
                    'test/component/*.component.shared.spec.js'
                ]
            }] : []),
            ...(isMobile || isShared ? [{
                browserName: 'chrome',
                acceptInsecureCerts: true,
                'goog:chromeOptions': {
                    mobileEmulation: { deviceName: 'Pixel 2' }
                },
                specs: VS_DEBUGGER ? [SPEC_FILE] : [
                    'test/component/*.component.mobile.spec.js',
                    'test/component/*.component.shared.spec.js'
                ]
            }] : [])
        ]
    },
    visual: {
        capabilities: [
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                specs: [
                    'test/visual/*.visual.desktop.spec.js',
                    'test/visual/*.visual.mobile.spec.js',
                    'test/visual/*.visual.shared.spec.js'
                ]
            }
        ]},
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
    ] : [],
    services: ['chromedriver']
});

const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');
const isShared = () => SPEC_FILE.endsWith('shared.spec.js');

exports.default = settings;