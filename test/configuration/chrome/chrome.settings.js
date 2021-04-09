// Used to determine if tests are being run through VS Code debugger.
// If true, only run the file being debugged.
const { VS_DEBUGGER, SPEC_FILE } = process.env;

const settings = () => ({
    baseUrl: 'http://localhost:8080',
    capabilities: [
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        specs: !VS_DEBUGGER ? [
            'test/specs/component/*.component.desktop.spec.js',
            'test/specs/component/*.component.shared.spec.js'
        ] : [SPEC_FILE]
    },
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
            mobileEmulation: {'deviceName': 'iPhone X'}
        },
        specs: !VS_DEBUGGER ? [
            'test/specs/component/*.component.mobile.spec.js',
            'test/specs/cmponent/*.component.shared.spec.js'
        ] : [SPEC_FILE]
    }],
    services: ['chromedriver'],
});

exports.default = settings;
