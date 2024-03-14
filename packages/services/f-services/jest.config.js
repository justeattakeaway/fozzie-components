module.exports = {
    moduleFileExtensions: [
        'js',
        'json'
    ],

    transform: {
        '^.+\\.js$': 'babel-jest'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es)/)'
    ],

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testEnvironment: 'jsdom'
};
