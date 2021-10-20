const { VS_DEBUGGER, SPEC_FILE } = process.env;
const browserstackName = `Local - ${process.env.BROWSERSTACK_USERNAME} ${new Date().toLocaleTimeString()}`;

const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');
const isShared = () => SPEC_FILE.endsWith('shared.spec.js');

const configuration = () => ({
    baseUrl: 'http://bs-local.com:8080',
    capabilities: [
        ...(isMobile || isShared ? [{
            os: 'android',
            osVersion: '11.0',
            browserName: 'chrome',
            device: 'Google Pixel 4',
            local: 'true',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true
            // specs: VS_DEBUGGER ? [SPEC_FILE] : [
            //     'test/component/*.component.mobile.spec.js',
            //     'test/component/*.component.shared.spec.js'
            // ]
        }] : []),
        ...(isMobile || isShared ? [{
            os: 'ios',
            osVersion: '14.0',
            browserName: 'safari',
            device: 'iPhone 12',
            local: 'true',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true
            // specs: VS_DEBUGGER ? [SPEC_FILE] : [
            //     'test/component/*.component.mobile.spec.js',
            //     'test/component/*.component.shared.spec.js'
            // ]
        }] : []),
        ...(isDesktop || isShared ? [{
            os: 'OS X',
            osVersion: 'Big sur',
            browserName: 'safari',
            browserVersion: '14',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            // specs: VS_DEBUGGER ? [SPEC_FILE] : [
            //     'test/component/*.component.desktop.spec.js',
            //     'test/component/*.component.shared.spec.js'
            // ]
        }] : [])
    ],
    reporters: [],
    services: [['browserstack', {
        browserstackLocal: true
    }]]
});


exports.default = configuration;
