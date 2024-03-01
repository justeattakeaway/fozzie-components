module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.svg$': './../../../../test/utils/svgTransform.js'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|axios)/)'
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

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testEnvironment: 'jsdom',

    modulePathIgnorePatterns: [
        './test/accessibility/',
        './test/component/',
        './test/visual/'
    ],

    setupFiles: [
        '<rootDir>/test-utils/settings/jest.crypto-setup.js'
    ]
};
