module.exports = {
    setupFilesAfterEnv: [
        'jest-extended'
    ],

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~include-media/(.*)$': '<rootDir>../../node_modules/include-media/$1',
        '^~@justeat/(.*)$': '<rootDir>../../node_modules/@justeat/$1',
        '\\.(css|scss)$': 'jest-transform-stub'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@justeattakeaway/cc-stampcards-adapter|@justeattakeaway/cc-braze-adapter|@justeattakeaway/cc-utils|@justeattakeaway/cc-filters|@braze/web-sdk)/)'
    ],

    testEnvironment: 'jsdom'
};
