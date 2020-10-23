const magicImporter = require('node-sass-magic-importer');

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
                data: '@import "@/assets/scss/common.scss";'
            });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
