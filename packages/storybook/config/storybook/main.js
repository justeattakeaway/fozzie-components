const { getStoryFiles } = require('./story.config');

const storyFiles = getStoryFiles();
module.exports = {
    stories: storyFiles,
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-knobs',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-controls'
    ],
    webpackFinal: async config => {
        const newConfig = {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.js?$/,
                        use: [
                            {
                                loader: require.resolve('babel-loader'),
                                options: {
                                    rootMode: 'upward'
                                }
                            }
                        ],
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                ...config.resolve,
                extensions: [...(config.resolve.extensions || [])]
            }
        };

        return newConfig;
    }
};
