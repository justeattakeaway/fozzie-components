module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/recommended',
        '@justeat/eslint-config-fozzie'
    ],

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};
