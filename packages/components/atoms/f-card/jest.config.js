module.exports = {
    globals: {
        'vue-jest': {
            experimentalCSSCompile: false
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

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~include-media/(.*)$': '<rootDir>../../node_modules/include-media/$1',
        '^~@justeat/(.*)$': '<rootDir>../../node_modules/@justeat/$1',
        '\\.(css|scss)$': 'jest-transform-stub'
    },

    modulePathIgnorePatterns: [
        './test/component/',
        './test/accessibility'
    ],

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testEnvironment: 'jsdom',

    testURL: 'http://localhost/'
};
