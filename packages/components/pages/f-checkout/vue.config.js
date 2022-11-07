const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const sassOptions = require('../../../../config/sassOptions')(rootDir);

// vue.config.js
module.exports = {
    parallel: false,
    chainWebpack: config => {
        config.module
            .rule('scss-importer')
            .test(/\.scss$/)
            .use('importer')
            .loader('sass-loader')
            .options({
                ...sassOptions,
                // eslint-disable-next-line quotes
                additionalData: `@use "../assets/scss/common.scss";`
            });

        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');

        config.externals({
            '@justeat/f-alert': '@justeat/f-alert',
            '@justeat/f-button': '@justeat/f-button',
            '@justeat/f-card': '@justeat/f-card',
            '@justeat/f-card-with-content': '@justeat/f-card-with-content',
            '@justeat/f-error-message': '@justeat/f-error-message',
            '@justeat/f-form-field': '@justeat/f-form-field',
            '@justeat/f-link': '@justeat/f-link',
            '@justeat/f-mega-modal': '@justeat/f-mega-modal'
        });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
