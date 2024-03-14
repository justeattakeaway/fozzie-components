module.exports = {
    setupFilesAfterEnv: [
        'jest-extended'
    ],

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testEnvironment: 'jsdom'
};
