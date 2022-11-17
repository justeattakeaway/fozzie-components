module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: "@babel/eslint-parser",
    overrides: [
        {
            files: [
                '**/*.js'
            ],
            rules: {
                'global-require': 'off'
            }
        }
    ]
};
