module.exports = {
    globals: {
        'vue-jest': {
            experimentalCSSCompile: false // hoping this will be a temporary fix, as tests fail when updating to dart-sass currently with vue-cli
        }
    },

    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es)/)'
    ],

    testURL: 'http://localhost/',

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    modulePathIgnorePatterns: [
        './test/component/',
        './test/accessibility'
    ]
};
