module.exports = {
    root: true,
    extends: [
        '@justeat/eslint-config-fozzie'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-quotes': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
