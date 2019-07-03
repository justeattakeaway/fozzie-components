module.exports = {
    root: true,

    env: {
        node: true
    },

    globals: {
        Vue: true
    },

    extends: [
        'plugin:vue/recommended',
        '@justeat/eslint-config-fozzie'
    ],

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-expressions': ['error', { allowTernary: true }]
    }
};
