module.exports = {
    root: true,
    extends: [
        '@justeat/eslint-config-fozzie'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-quotes': 'off',
        'vue/sort-keys': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: "module",
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@vue/cli-service/webpack.config.js')
            }
        }
    },
    globals: {
        "allure": "readonly"
    }
};
