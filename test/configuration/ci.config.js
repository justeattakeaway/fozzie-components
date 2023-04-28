const { testType, BRANCH_NUMBER } = require('./shared.config');

const url = BRANCH_NUMBER ? `https://pr${BRANCH_NAME}.${AMPLIFY_ID}.amplifyapp.com` : 'https://vue.pie.design';

const configuration = {
    logLevel: 'error',
    baseUrl: url,
    bail: 0,
    mochaOpts: {
        timeout: parseInt(process.env.WDIO_TIMEOUT, 10) || 60000,
        // Default timeout for all waitFor* commands.
        waitforTimeout: parseInt(process.env.WDIO_WAITFOR_TIMEOUT, 10) || 10000
    },
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    availableServices: {
        chromedriver: {
            args: ['--whitelisted-ips=127.0.0.1', '--disable-dev-shm-usage'],
            headless: true,
            path: '/'
        },
        percy: {
            viewports: {
                mobile: [414],
                desktop: [1280]
            }
        }
    },
    testType,
    availableReporters: {
        allure: {
            outputDir: `${global.baseDir}/test/results/allure-results`
        }
    },
    // 'allure', 'video'
    testReporters: ['allure', 'video']
};

module.exports = configuration;
