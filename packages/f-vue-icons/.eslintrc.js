module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/recommended',
        '@vue/standard',
        '@justeat/eslint-config-fozzie'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'import/prefer-default-export': 'off',
        'max-len': 'off',
        'prefer-promise-reject-errors': 'off',
        'vue/html-indent': ['error', 4],
        'vue/valid-template-root': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'import/no-extraneous-dependencies': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
