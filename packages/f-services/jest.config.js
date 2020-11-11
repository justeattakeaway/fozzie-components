module.exports = {
    moduleFileExtensions: [
        'js',
        'json'
    ],

    transform: {
        '^.+\\.js$': 'babel-jest'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es)/)'
    ],

    testURL: 'http://localhost/',

    setupFilesAfterEnv: [
        '../../jest.setup.js'
    ]
};
