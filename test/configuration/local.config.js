const { testType } = require('./shared.config');

const configuration = {
    logLevel: 'info',
    baseUrl: 'http://localhost:8080',
    bail: 0,
    headless: false,
    mochaOpts: {
        timeout: 60000,
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000
    },
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    percy: {
        viewports: {
            mobile: [414],
            desktop: [1280]
        }
    },
    testType,
    availableReporters: {
        allure: {
            outputDir: '../../../../test/results/allure-results'
        }
    },
    // 'allure', 'video', 'junit'
    testReporters: []
};

module.exports = configuration;
