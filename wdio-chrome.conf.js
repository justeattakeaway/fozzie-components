const merge = require('deepmerge');
const sharedConf = require('./wdio-shared.conf');
const { getTestConfiguration } = require('./test/configuration/configuration-helper');

const configuration = getTestConfiguration();

exports.config = merge(sharedConf.config, {
    // =====================
    // Server Configurations
    // =====================
    path: '/',
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver'],
    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            maxInstances: 1,
            acceptInsecureCerts: true,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [].concat(configuration.headless ? [
                    '--no-sandbox',
                    '--disable-infobars',
                    '--headless',
                    '--disable-gpu',
                    '--window-size=1920,1080'] : [])
            }
        }
    ]
});
