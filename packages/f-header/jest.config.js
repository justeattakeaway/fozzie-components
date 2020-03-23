module.exports = {
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

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testMatch: [
        '**/*.{spec|test}.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],

    testURL: 'http://localhost/'
};
