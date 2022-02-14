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
    core: {
        builder: 'webpack5'
    },
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
            // Added to prevent CircleCI from running out of memory - https://github.com/storybookjs/storybook/issues/6408#issuecomment-648197797
            optimization: {
                minimize: false,
                minimizer: []
            },
            resolve: {
                ...config.resolve,
                extensions: [...(config.resolve.extensions || [])]
            }
        };

        return newConfig;
    }
};
