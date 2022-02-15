module.exports = {
    globals: {
        'vue-jest': {
            experimentalCSSCompile: false // hoping this will be a temporary fix, as tests fail when updating to dart-sass currently with vue-cli
        }
    },

    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(babel-jest|jest-vue-preprocessor|lodash-es)/)'
    ],

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testURL: 'http://localhost/',

    modulePathIgnorePatterns: [
        './test/component/',
        './test/accessibility'
    ]
};
