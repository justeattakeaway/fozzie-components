module.exports = {
    globals: {
        'vue-jest': {
            experimentalCSSCompile: false, // hoping this will be a temporary fix, as tests fail when updating to dart-sass currently with vue-cli
            hideStyleWarn: true // We hide style warnings given the first time we run the tests it complains about some styles. The second time the tests are run, the warning disappears. https://github.com/vuejs/vue-jest/issues/178#issuecomment-529175129
        }
    },

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
        'node_modules/(?!(lodash-es)/)'
    ],

    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    testEnvironment: 'jsdom',

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    modulePathIgnorePatterns: [
        './test/component/',
        './test/accessibility'
    ]
};
