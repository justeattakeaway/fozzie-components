const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const assetsPlugin = require('postcss-assets');
const sassOptions = require('../../../../config/sassOptions')(rootDir);

// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('scss-importer')
            .test(/\.scss$/)
            .use('importer')
            .loader('sass-loader')
            .options({
                ...sassOptions,
                // eslint-disable-next-line quotes
                additionalData: `@import "../assets/scss/common.scss";`
            });
    },

    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        assetsPlugin
                    ]
                }
            }
        }
    },

    pluginOptions: {
        lintStyleOnBuild: true
    }
};
