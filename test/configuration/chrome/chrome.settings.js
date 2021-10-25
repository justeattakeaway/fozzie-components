// Used to determine if tests are being run through VS Code debugger.
// If true, only run the file being debugged.
const { ALLURE_REPORTER, SPEC_FILE, VS_DEBUGGER } = process.env;
const video = require('wdio-video-reporter');

const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');

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
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                specs: VS_DEBUGGER ? [SPEC_FILE] : [
                    'test/component/*.component.spec.js'
                ]
            }
        ]
    },
    visual: {
        capabilities: [
            ...(isDesktop ? [{
                browserName: 'chrome',
                acceptInsecureCerts: true,
                specs: [
                    'test/visual/*.visual.desktop.spec.js'
                ]
            }] : []),
            ...(isMobile ? [{
                browserName: 'chrome',
                acceptInsecureCerts: true,
                'goog:chromeOptions': {
                    mobileEmulation: { deviceName: 'Pixel 2' }
                },
                specs: [
                    'test/visual/*.visual.mobile.spec.js'
                ]
            }] : [])
        ]
    },
    reporters: ALLURE_REPORTER === 'true' ? [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
            outputDir: '../../../../test/results/allure-results'
        }],
        ['allure', {
            outputDir: '../../../../test/results/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            disableMochaHooks: false
        }]
    ] : [],
    services: ['chromedriver']
});

exports.default = settings;
