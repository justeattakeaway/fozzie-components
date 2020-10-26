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
                // eslint-disable-next-line quotes
                data: `@import "@/assets/scss/common.scss";`
            });

        config.externals({
            'body-scroll-lock': 'body-scroll-lock'
        });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
