module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: "babel-eslint",
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
