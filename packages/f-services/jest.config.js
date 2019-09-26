module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json'
    ],

    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(babel-jest|jest-vue-preprocessor|lodash-es)/)'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },

    testMatch: [
        '**/*.{spec|test}.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],

    testURL: 'http://localhost/'
};
