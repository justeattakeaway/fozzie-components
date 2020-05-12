module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.js$': 'babel-jest'
    },

    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es)/)'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~include-media/(.*)$': '<rootDir>../../node_modules/include-media/$1',
        '^~@justeat/(.*)$': '<rootDir>../../node_modules/@justeat/$1'
    },

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testURL: 'http://localhost/',

    globals: {
        'vue-jest': {
            resources: {
                scss: [
                    './src/assets/scss/common.scss'
                ]
            }
        }
    }
};
