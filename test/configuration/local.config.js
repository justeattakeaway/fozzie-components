const { testType } = require('./shared.config');

const configuration = {
    logLevel: 'error',
    baseUrl: 'http://localhost:8080',
    bail: 0,
    mochaOpts: {
        timeout: 60000,
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000
    },
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    availableServices: {
        percy: {
            viewports: {
                mobile: [414],
                desktop: [1280]
            }
        },
        chromedriver: {
            headless: false,
            path: '/',
            args: []
        }
    },
    testType,
    availableReporters: {
        allure: {
            outputDir: `${global.baseDir}/test/results/allure-results`
        }
    },
    // 'allure', 'video'
    testReporters: ['allure']
};

module.exports = configuration;
