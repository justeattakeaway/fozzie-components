module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.vue$': '@vue/vue2-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.js$': 'babel-jest'
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~include-media/(.*)$': '<rootDir>../../node_modules/include-media/$1',
        '^~@justeat/(.*)$': '<rootDir>../../node_modules/@justeat/$1'
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
        './test/component/',
        './test/accessibility',
        './test/visual'
    ],

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testEnvironment: 'jsdom'
};
