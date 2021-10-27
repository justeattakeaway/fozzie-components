require('@babel/register');
const percySnapshot = require('@percy/webdriverio');
const { getTestConfiguration, setTestReporters } = require('./test/configuration/configuration-helper');

const configuration = getTestConfiguration();

exports.config = {
    baseUrl: configuration.baseUrl,
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    // Specs are defined in test/configuration/chrome/chrome.settings.js
    specs: configuration.testType.specs,
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        // Babel setup
        require: ['@babel/register'],
        ui: 'bdd',
        timeout: configuration.mochaOpts.timeout
    },
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: configuration.logLevel,
    // Default timeout for all waitFor* commands.
    waitforTimeout: configuration.mochaOpts.waitforTimeout,
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: configuration.connectionRetryTimeout,
    //
    // Default request retries count
    connectionRetryCount: configuration.connectionRetryTimeout,
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    reporters: setTestReporters(configuration),
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: () => {
        console.log('Using the following WDIO Config:', JSON.stringify(configuration));
        if (configuration.testType.services.includes('percy')) {
            browser.addCommand('percyScreenshot', (screenshotName, featureType) => {
                const viewportWidths = {
                    desktop: configuration.percy.viewports.mobile,
                    mobile: configuration.percy.viewports.desktop
                };

                const viewportWidth = () => viewportWidths[featureType.toLowerCase()] || viewportWidths.default;


                browser.call(async () => {
                    await percySnapshot(`${screenshotName} - ${featureType}`, {
                        widths: viewportWidth[0]
                    });
                });
            });
        }
    },
    /**
    * Function to be executed after a test (in Mocha/Jasmine)
    */
    afterTest: () => {
        browser.takeScreenshot();
        browser.deleteAllCookies();
    },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // eslint-disable-next-line consistent-return
    after: () => {
        console.log(
            '-----------------------------------------------------', '\n',
            'For more error logs, add "allure" to "testReporters" in "test/configuration/local.config.js".', '\n', '\n', 'To then see the ALLURE REPORT, please head to the route of the directory and run', '\n',
            'yarn allure:open', '\n',
            '-----------------------------------------------------'
        );
    }
};
