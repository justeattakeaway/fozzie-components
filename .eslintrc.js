module.exports = {
    root: true,
    extends: [
        '@justeat/eslint-config-fozzie',

        // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/tree/master/docs
        'plugin:vuejs-accessibility/recommended'
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

        // Setting these to warn temporarily otherwise it breaks the dev experience
        // and makes it hard to actually fix them.
        // Once the existing issues are fixed we can remove the rules so they default back to error.
        'vuejs-accessibility/alt-text': 'warn',
        'vuejs-accessibility/anchor-has-content': 'warn',
        'vuejs-accessibility/form-control-has-label': 'warn',
        'vuejs-accessibility/label-has-for': [
            'warn',
            {
                required: {
                    some: ['nesting', 'id']
                }
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@vue/cli-service/webpack.config.js')
            }
        }
    },
    globals: {
        browser: 'readonly',
        allure: 'readonly'
    }
};
