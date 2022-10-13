module.exports = {
    collectCoverageFrom: [
        'src/**/*.js'
    ],

    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    testEnvironment: 'jsdom',

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testMatch: [
        '**/*.{spec,test}.(js|jsx|ts|tsx)',
        '**/__tests__/*.(js|jsx|ts|tsx)'
    ],

    testPathIgnorePatterns: [
        '/.yalc/',
        'scss'
    ],

    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};
