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
        'node_modules/(?!(lodash-es|@justeat/f-braze-adapter)/)'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~include-media/(.*)$': '<rootDir>../../node_modules/include-media/$1',
        '^~@justeat/(.*)$': '<rootDir>../../node_modules/@justeat/$1',
        // Ensure we're mocking out modularised styles
        '\\.vue\\?.*(<=\\?|&)type=style(?:&|$)': '<rootDir>/src/_mocks/vueStyleMocks.js'
    },

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    globals: {
        'vue-jest': {
            hideStyleWarn: true // We hide style warnings given the first time we run the tests it complains about some styles. The second time the tests are run, the warning disappears. https://github.com/vuejs/vue-jest/issues/178#issuecomment-529175129
        }
    },

    testURL: 'http://localhost/',

    modulePathIgnorePatterns: [
        './.yalc/', // Don't run tests in yalc-linked packages
        './test/specs/component/',
        './test/specs/accessibility'
    ],

    setupFilesAfterEnv: [
        '../../../../jest.setup.js'
    ]

};
