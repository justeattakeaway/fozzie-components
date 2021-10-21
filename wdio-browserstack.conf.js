require('@babel/register');
const browserstack = require('browserstack-local');
const merge = require('deepmerge');
const sharedConf = require('./wdio-shared.conf');
const { getTestConfiguration } = require('./test/configuration/configuration-helper');


const configuration = getTestConfiguration();

exports.config = merge(sharedConf.config, {
    // ====================
    // Browserstack
    // ====================
    user: 'lizzieturney1',
    key: 'YYXo6De8jD3uZhQeqrYp',
    // user: configuration.availableServices.browserstack.user,
    // key: configuration.availableServices.browserstack.key,
    services: [['browserstack', {
        browserstackLocal: true
    }]],
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    capabilities: [].concat(configuration.availableServices.browserstack.capabilities),
    /**
     * Start browserstack local before start of test
     */
    onPrepare: () => {
        // config, capabilities - parameters
        // console.log('Setting up capabilities', capabilities)
        console.log('Connecting local'); // eslint-disable-line

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line camelcase
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({ key: exports.config.key }, error => {
                if (error) { return reject(error); }
                console.log('Connected. Now testing...'); // eslint-disable-line

                return resolve();
            });
        });
    },
    /**
     * Stop browserstack local after end of test
     */
    onComplete: (/* capabilities, specs*/) => {
        exports.bs_local.stop(() => { });
    }
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    // afterTest: (test, context, { error, result, duration, passed, retries }) => {

    //     const hasPassed = passed ? 'passed' : 'failed';

    //     driver.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"${hasPassed}","reason": ""}}`);
    //     browser.reloadSession();
    // }
});
