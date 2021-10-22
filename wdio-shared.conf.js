require('@babel/register');
const percySnapshot = require('@percy/webdriverio');
const {
    getTestConfiguration, setTestServices, setTestReporters, getConfigurationSettings
} = require('./test/configuration/configuration-helper');

const configuration = getTestConfiguration();

exports.config = {
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
    capabilities: [].concat(getConfigurationSettings(configuration.availableServices.chromedriver.headless)),
    // Set a base URL for all tests
    baseUrl: configuration.baseUrl,
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: configuration.logLevel,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: configuration.mochaOpts.waitforTimeout,
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: setTestServices(configuration),

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
        if (configuration.testType.services.includes('percy')) {
            browser.addCommand('percyScreenshot', (screenshotName, featureType) => {
                let viewportWidths;

                switch (featureType.toLowerCase()) {
                    case 'desktop':
                        viewportWidths = configuration.availableServices.percy.viewportWidths.desktop;
                        break;
                    case 'mobile':
                        viewportWidths = configuration.availableServices.percy.viewportWidths.mobile;
                        break;
                    default:
                        throw new Error(`${featureType} is not a valid feature type. Please use 'desktop' or 'mobile'.`);
                }

                browser.call(async () => {
                    await percySnapshot(`${screenshotName} - ${featureType}`, {
                        widths: viewportWidths
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
            'To see the ALLURE REPORT, please head to the route of directory and type', '\n',
            'yarn allure:open', '\n',
            '-----------------------------------------------------'
        );
    }
};
