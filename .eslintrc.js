module.exports = {
    root: true,
    extends: [
        '@justeat/eslint-config-fozzie'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-quotes': 'off',
        'vue/sort-keys': 'off',
        'vue/multiline-html-element-content-newline': ['error', {
            'ignores': [
                'a',
                'abbr',
                'audio',
                'b',
                'bdi',
                'bdo',
                'canvas',
                'cite',
                'code',
                'data',
                'del',
                'dfn',
                'em',
                'i',
                'iframe',
                'ins',
                'kbd',
                'label',
                'map',
                'mark',
                'noscript',
                'object',
                'option',
                'output',
                'picture',
                'pre',
                'q',
                'ruby',
                's',
                'samp',
                'small',
                'span',
                'strong',
                'sub',
                'sup',
                'svg',
                'textarea',
                'time',
                'u',
                'var',
                'video']
        }],
        'import/no-extraneous-dependencies': 'off',
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
