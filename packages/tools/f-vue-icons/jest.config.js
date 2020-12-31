module.exports = {
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
        'node_modules/(?!(babel-jest|jest-vue-preprocessor)/)'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/fileMock.js'
    },

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testURL: 'http://localhost/',

    setupFilesAfterEnv: [
        '../../jest.setup.js'
    ]
};
