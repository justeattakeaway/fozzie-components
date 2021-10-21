const { getUrlForEnvironment } = require('./configuration-helper');
const {
    chrome, testType, browserstack, percy
} = require('./shared.config');

const configuration = {
    logLevel: 'info',
    baseUrl: getUrlForEnvironment(),
    mochaOpts: {
        timeout: 60000,
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000
    },
    availableServices: {
        chromedriver: {
            args: [],
            headless: false,
            path: '/'
        },
        browserstack,
        chrome,
        percy
    },
    testType,
    availableReporters: {
        allure: {
            outputDir: '../../../../test/results/allure-results'
        }
    },
    // 'allure', 'video', 'junit'
    testReporters: ['allure']
};

module.exports = configuration;
