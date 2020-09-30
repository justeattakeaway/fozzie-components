module.exports = {
    stories: [
        '../../../**/*.stories.@(js|mdx)',
        '../../../../stories/*.stories.@(js|mdx)'
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-knobs',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-controls',
        'storybook-addons-abstract'
    ]
};
