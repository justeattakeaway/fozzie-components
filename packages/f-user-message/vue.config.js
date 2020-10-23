const magicImporter = require('node-sass-magic-importer');
const devServer = require('./vue.config.devServer');

// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('scss-importer')
            .test(/\.scss$/)
            .use('importer')
            .loader('sass-loader')
            .options({
                importer: magicImporter(),
                // eslint-disable-next-line quotes
                data: `@import "@/assets/scss/common.scss";`
            });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    },
    devServer
};
