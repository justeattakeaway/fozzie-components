const path = require('path');
const packageJson = require('./package.json');

const rootDir = path.join(__dirname, '..', '..');
const sassOptions = require('../../../../config/sassOptions')(rootDir);

// vue.config.js
module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: `[name]__${packageJson.version}--[hash:base64:7]`
                },
                localsConvention: 'camelCaseOnly'
            }
        }
    },
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
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
