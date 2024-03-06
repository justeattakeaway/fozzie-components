module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue2-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@justeattakeaway/cc-stampcards-adapter|@justeattakeaway/cc-braze-adapter|@justeattakeaway/cc-utils|@justeattakeaway/cc-filters|@braze/web-sdk)/)'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~include-media/(.*)$': '<rootDir>../../node_modules/include-media/$1',
        '^~@justeat/(.*)$': '<rootDir>../../node_modules/@justeat/$1',
        '\\.(css|scss)$': 'jest-transform-stub'
    },

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    globals: {
        'vue-jest': {
            hideStyleWarn: true, // We hide style warnings given the first time we run the tests it complains about some styles. The second time the tests are run, the warning disappears. https://github.com/vuejs/vue-jest/issues/178#issuecomment-529175129
            experimentalCSSCompile: false // hoping this will be a temporary fix, as tests fail when updating to dart-sass currently with vue-cli
        }
    },

    modulePathIgnorePatterns: [
        './test/accessibility/',
        './test/component/',
        './test/visual/'
    ],

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testEnvironment: 'jsdom',

    setupFiles: [
        '<rootDir>/test-utils/settings/jest.crypto-setup.js'
    ]
};
