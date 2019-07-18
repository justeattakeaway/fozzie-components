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

        // Inline SVGs
        const svgRule = config.module.rule('svg');

        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        svgRule.uses.clear();
        // add replacement loader(s)
        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end();
    }
};
