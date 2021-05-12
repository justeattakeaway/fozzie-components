const { utils: { getPackages } } = require('@commitlint/config-lerna-scopes');

module.exports = {
    extends: [
        '@commitlint/config-conventional',
        '@commitlint/config-lerna-scopes'
    ],
    rules: {
        'type-enum': [2, 'always', [
            'feat',
            'fix',
            'chore',
            'ci',
            'deletion',
            'docs',
            'perf',
            'refactor',
            'release',
            'style',
            'test'
        ]],
        'scope-enum': async ctx => [2, 'always', [...(await getPackages(ctx)), 'fozzie-components']]
    }
};
