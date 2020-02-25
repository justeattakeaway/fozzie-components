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

    testMatch: [
        '**/*.{spec|test}.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],

    testURL: 'http://localhost/'
};
