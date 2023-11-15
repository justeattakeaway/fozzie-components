const merge = require('deepmerge');
const sharedConf = require('./wdio-shared.conf');
const { getTestConfiguration } = require('./test/configuration/configuration-helper');

const configuration = getTestConfiguration();

exports.config = merge(sharedConf.config, {
    // =====================
    // Server Configurations
    // =====================
    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            maxInstances: 1,
            acceptInsecureCerts: true,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [].concat(configuration.availableServices.chromedriver.headless ? [
                    '--no-sandbox',
                    '--disable-infobars',
                    '--headless',
                    '--disable-gpu',
                    '--window-size=1920,1080'] : [])
            }
        }
    ]
});
