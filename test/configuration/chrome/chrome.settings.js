let browserstackName = `Local - ${process.env.BROWSERSTACK_USERNAME} ${new Date().toLocaleTimeString()}`;

const settings = () => ({
    capabilities: [
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        specs: [
            'test/specs/component/**/*.component.desktop.spec.js',
            'test/specs/component/**/*.component.shared.spec.js'
        ]
    },
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
            mobileEmulation: {'deviceName': 'iPhone X'}
        },
        specs: [
            'test/specs/component/**/*.component.mobile.spec.js',
            'test/specs/component/**/*.component.shared.spec.js'
        ]
    }],
    services: ['chromedriver'],
});

exports.default = settings;
