const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
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
                additionalData: `@use "../assets/scss/common.scss";`
            });

        config.externals({
            '@braze/web-sdk': '@braze/web-sdk',
            vuex: 'vuex',
            'js-cookie': 'js-cookie',

            // This just externalises the JS currently, not the CSS
            '@justeat/f-breadcrumbs': '@justeat/f-breadcrumbs',
            '@justeat/f-button': '@justeat/f-button',
            '@justeat/f-card': '@justeat/f-card',
            '@justeat/f-content-cards': '@justeat/f-content-cards',
            '@justeat/f-media-element': '@justeat/f-media-element',
            '@justeat/f-tabs': '@justeat/f-tabs'
        });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
