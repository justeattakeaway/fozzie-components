// Used to determine if tests are being run through VS Code debugger.
// If true, only run the file being debugged.
const { VS_DEBUGGER, SPEC_FILE } = process.env;
let browserstackName = `Local - ${process.env.BROWSERSTACK_USERNAME} ${new Date().toLocaleTimeString()}`;

const settings = () => ({
    baseUrl: 'http://bs-local.com:8080',
    capabilities: [
        {
            deviceType: 'mobile' 
            os: 'android',
            osVersion: '11.0',
            browserName: 'chrome',
            device: 'Google Pixel 4',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: !VS_DEBUGGER ? [
                'test/specs/component/*.component.mobile.spec.js',
                'test/specs/component/*.component.shared.spec.js',
            ] : [SPEC_FILE]
        },
        {
            deviceType: 'mobile',
            os: 'ios',
            osVersion: '14.0',
            browserName: 'safari',
            device: 'iPhone 12',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: [
                'test/specs/component/*.component.mobile.spec.js',
                'test/specs/component/*.component.shared.spec.js',
            ]
        },
        {
            deviceType: 'desktop',
            os: 'OS X',
            osVersion: 'Big sur',
            browserName: 'safari',
            browserVersion: '14',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: [
                'test/specs/component/*.component.desktop.spec.js',
                'test/specs/component/*.component.shared.spec.js',
            ]
        }
    ],
    services: [['browserstack', {
        browserstackLocal: true
    }]]
});

exports.default = settings;
