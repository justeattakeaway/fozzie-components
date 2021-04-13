// Used to determine if tests are being run through VS Code debugger.
// If true, only run the file being debugged.
const { VS_DEBUGGER, SPEC_FILE } = process.env;

const settings = () => ({
    baseUrl: 'http://localhost:8080',
    capabilities: [
        ...(isDesktop || isShared ? [{
            browserName: 'chrome',
            acceptInsecureCerts: true,
            specs: VS_DEBUGGER ? [SPEC_FILE] : [
                'test/specs/component/*.component.desktop.spec.js',
                'test/specs/component/*.component.shared.spec.js'
            ]
        }] : []),
        ...(isMobile || isShared ? [{
            browserName: 'chrome',
            acceptInsecureCerts: true,
            "goog:chromeOptions": {
                mobileEmulation: {'deviceName': 'iPhone X'}
            },
            specs: VS_DEBUGGER ? [SPEC_FILE] : [
                'test/specs/component/*.component.mobile.spec.js',
                'test/specs/component/*.component.shared.spec.js'
            ]
        }] : [])
    ],
    services: ['chromedriver'],
});

const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');
const isShared = () => SPEC_FILE.endsWith('shared.spec.js');

exports.default = settings;
