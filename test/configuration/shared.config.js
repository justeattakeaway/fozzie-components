// To set browserstack capabilities, please visit: https://www.browserstack.com/automate/capabilities
const { setBrowserStackBuildName } = require('./configuration-helper');

const TEST_TYPE = process.env.TEST_TYPE.toLowerCase();

const { SPEC_FILE, VS_DEBUGGER } = process.env;

const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');
const isShared = () => SPEC_FILE.endsWith('shared.spec.js');

exports.testType = {
    ...(TEST_TYPE === 'component' && (isDesktop || isShared) ? {
        name: 'component',
        services: ['chromedriver'],
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            'test/component/*.component.desktop.spec.js',
            'test/component/*.component.shared.spec.js'
        ]
    } : []),
    ...(TEST_TYPE === 'component' && (isMobile || isShared) ? [{
        name: 'component',
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            'test/component/*.component.mobile.spec.js',
            'test/component/*.component.shared.spec.js'
        ]
    }] : []),
    ...(TEST_TYPE === 'a11y' ? {
        name: 'accessibility',
        services: ['chromedriver', 'percy'],
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            'test/accessibility/axe-accessibility.spec.js']
    } : {}),
    ...(TEST_TYPE === 'visual' && isDesktop ? {
        name: 'visual',
        services: ['chromedriver', 'percy'],
        specs: ['test/visual/*.visual.desktop.spec.js']
    } : {}),
    ...(TEST_TYPE === 'visual' && isMobile ? {
        name: 'visual',
        services: ['chromedriver', 'percy'],
        specs: ['test/visual/*.visual.mobile.spec.js']
    } : {})
};

exports.browserstack = {
    capabilities: {
        'bstack:options': {
            ...(isMobile || isShared ? {
                os: 'android',
                osVersion: '14',
                browserName: 'chrome',
                deviceName: process.env.BROWSERSTACK_DEVICE || 'Google Pixel 4',
                browserVersion: '',
                buildName: '',
                networkLogs: true,
                projectName: 'Fozzie-Components'
            } : {}),
            ...(isMobile || isShared ? {
                os: 'ios',
                osVersion: '14',
                browserName: 'safari',
                deviceName: 'iPhone 12',
                browserVersion: '',
                buildName: '',
                networkLogs: true,
                projectName: 'Fozzie-Components'
            } : {}),
            ...(isDesktop || isShared ? {
                os: 'OS X',
                osVersion: 'Big sur',
                browserName: 'safari',
                browserVersion: '14',
                buildName: '',
                networkLogs: true,
                projectName: 'Fozzie-Components'
            } : {})
        }
    }
};

exports.chrome = {
    capabilities: [
        ...(isMobile || isShared ? [{
            'goog:chromeOptions': {
                mobileEmulation: { deviceName: 'Pixel 2' }
            }
        }] : {})
    ]
};

exports.percy = {
    // Widths defined - https://github.com/justeat/fozzie/blob/master/src/scss/settings/_variables.scss#L76
    viewportWidths: {
        desktop: [1280],
        mobile: [414]
    }
};
