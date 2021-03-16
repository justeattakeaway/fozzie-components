// Learn How Configuration Works: https://skipthedishes.atlassian.net/l/c/ViFW6SaY
// To set browserstack capabilities, please visit: https://www.browserstack.com/automate/capabilities
const configuration = () => ({
    capabilities: {
        os: 'android',
        osVersion: '11.0',
        browserName: 'chrome',
        device: 'Google Pixel 4',
        browserVersion: ''
    }
});

exports.default = configuration;
