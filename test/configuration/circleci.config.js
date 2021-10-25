const { testType } = require('./shared.config');

const configuration = {
    loglevel: process.env.WDIO_LOG_LEVEL || 'info',
    baseUrl: 'http://localhost:8080',
    bail: 0,
    headless: true,
    mochaOpts: {
        timeout: 60000,
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000
    },
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    availableServices: {
        chromedriver: {
            args: ['--whitelisted-ips=127.0.0.1', '--disable-dev-shm-usage']
        }
    },
    percy: {
        desktopHugeWidth: 1280,
        mobileNarrowWidth: 414
    },
    testType,
    availableReporters: {},
    // 'allure', 'video', 'junit'
    testReporters: ['video', 'junit']
};

module.exports = configuration;
