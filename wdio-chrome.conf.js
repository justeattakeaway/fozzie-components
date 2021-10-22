/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');
const merge = require('deepmerge');
const sharedConf = require('./wdio-shared.conf');
const { chrome } = require('./test/configuration/shared.config');
const { getTestConfiguration } = require('./test/configuration/configuration-helper');

const configuration = getTestConfiguration();

exports.config = merge(sharedConf.config, {
    // ============
    // Capabilities
    // ============
    capabilities: [
        ...(isMobile || isShared ? [{
            maxInstances: 1,
            acceptInsecureCerts: true,
            browserName: 'chrome',
            'goog:chromeOptions': {
                mobileEmulation: { deviceName: 'Pixel 2' }
            }
        }] : [{
            maxInstances: 1,
            acceptInsecureCerts: true,
            browserName: 'chrome'
        }])
    ],
    path: configuration.availableServices.chromedriver.path
});
