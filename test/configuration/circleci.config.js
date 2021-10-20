const { getUrlForEnvironment } = require('./configuration-helper');
const { browserstack1, percy, testType } = require('./shared.config');

const configuration = {
    loglevel: process.env.WDIO_LOG_LEVEL || 'info',
    baseUrl: getUrlForEnvironment(),
    mochaOpts: {
        timeout: 60000,
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000
    },
    availableServices: {
        chromedriver: {
            args: ['--whitelisted-ips=127.0.0.1', '--disable-dev-shm-usage'],
            // Not running in headless due to current bug.
            headless: true,
            path: '/'
        },
        // To set browserstack capabilities, please visit: https://www.browserstack.com/automate/capabilities
        browserstack1,
        percy
    },
    testType,
    // No teamcity specific is set in config yet.
    availableReporters: {
    },
    // 'allure', 'video', 'junit'
    testReporters: ['video', 'junit']
};

module.exports = configuration;
