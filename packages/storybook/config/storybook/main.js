const { getChangedPackageStories } = require('./story.config');

const storyFiles = process.env.CHANGED_ONLY ? getChangedPackageStories() :
    [
        '../../../**/*.stories.@(js|mdx)',
        '../../../../stories/**/*.stories.@(js|mdx)'
    ];

module.exports = {
    stories: storyFiles,
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-knobs',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-controls'
    ]
};
