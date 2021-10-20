const { getUrlForEnvironment } = require('./configuration-helper');
const { browserstack1, percy, testType } = require('./shared.config');

const configuration = {
    logLevel: 'silent',
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
        browserstack1,
        percy
    },
    testType,
    availableReporters: {
        allure: {
            outputDir: '../../../../test/results/allure-results'
        }
    },
    // 'allure', 'video', 'teamcity'
    testReporters: ['allure']
};

module.exports = configuration;
