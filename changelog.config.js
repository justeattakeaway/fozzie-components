const { execSync } = require('child_process');

let output;
try {
    output = execSync('npx lerna ls --json');
} catch (error) {
    console.info('No local packages found.');
    process.exit(0);
}

const packages = JSON.parse(output.toString())
    .map(pkg => (pkg.name).replace('@justeat/', ''))
    .sort(); // this will contain the list of the packages, sorted in alphabetical order

module.exports = {
    questions: [
        'type',
        'scope',
        'subject',
        'body',
        'breaking'
    ],
    scopes: packages,
    list: [
        'feat',
        'fix',
        'chore',
        'ci',
        'deletion',
        'docs',
        'perf',
        'refactor',
        'style',
        'test'
    ],
    types: {
        chore: {
            description: 'Build process or auxiliary tool changes (e.g. Babel, ESlint, Vue, Webpack)',
            emoji: '🧹',
            value: 'chore'
        },
        ci: {
            description: '.circleci/config.yaml related changes',
            emoji: '⚙️',
            value: 'ci'
        },
        deletion: {
            description: 'Deleting or removing code',
            emoji: '🔥',
            value: 'deletion'
        },
        docs: {
            description: 'Documentation (or Storybook) only changes',
            emoji: '📚',
            value: 'docs'
        },
        feat: {
            description: 'A new feature',
            emoji: '🌟',
            value: 'feat'
        },
        fix: {
            description: 'A bug fix',
            emoji: '🐞',
            value: 'fix'
        },
        perf: {
            description: 'A code change that improves performance',
            emoji: '⚡',
            value: 'perf'
        },
        refactor: {
            description: 'A code change that neither fixes a bug or adds a feature',
            emoji: '🎨',
            value: 'refactor'
        },
        style: {
            description: 'Markup, white-space, formatting, missing semi-colons...',
            emoji: '💄',
            value: 'style'
        },
        test: {
            description: 'Adding or fixing tests',
            emoji: '✅',
            value: 'test'
        }
    }
};
