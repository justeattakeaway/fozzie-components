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

    testURL: 'http://localhost/',

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    modulePathIgnorePatterns: [
        './test/specs/component/'
    ],

    setupFilesAfterEnv: [
        '../../jest.setup.js'
    ]
};
