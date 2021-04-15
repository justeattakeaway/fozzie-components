// Used to determine if tests are being run through VS Code debugger.
// If true, only run the file being debugged.
const { VS_DEBUGGER, SPEC_FILE } = process.env;
let browserstackName = `Local - ${process.env.BROWSERSTACK_USERNAME} ${new Date().toLocaleTimeString()}`;

const settings = () => ({
    baseUrl: 'http://bs-local.com:8080',
    capabilities: [
        ...(isMobile || isShared ? [{
            os: 'android',
            osVersion: '11.0',
            browserName: 'chrome',
            device: 'Google Pixel 4',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: VS_DEBUGGER ? [SPEC_FILE] : [
                'test/specs/component/*.component.mobile.spec.js',
                'test/specs/component/*.component.shared.spec.js'
            ]
        }] : []),
        ...(isMobile || isShared ? [{
            os: 'ios',
            osVersion: '14.0',
            browserName: 'safari',
            device: 'iPhone 12',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: VS_DEBUGGER ? [SPEC_FILE] : [
                'test/specs/component/*.component.mobile.spec.js',
                'test/specs/component/*.component.shared.spec.js'
            ]
        }] : []),
        ...(isDesktop || isShared ? [{
            os: 'OS X',
            osVersion: 'Big sur',
            browserName: 'safari',
            browserVersion: '14',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: VS_DEBUGGER ? [SPEC_FILE] : [
                'test/specs/component/*.component.desktop.spec.js',
                'test/specs/component/*.component.shared.spec.js'
            ]
        }] : [])
    ],
    reporters: [],
    services: [['browserstack', {
        browserstackLocal: true
    }]]
});


const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');
const isShared = () => SPEC_FILE.endsWith('shared.spec.js');


exports.default = settings;
