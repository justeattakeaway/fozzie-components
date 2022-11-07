const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

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
            '@justeat/f-alert': '@justeat/f-alert',
            '@justeat/f-button': '@justeat/f-button',
            '@justeat/f-card': '@justeat/f-card',
            '@justeat/f-card-with-content': '@justeat/f-card-with-content',
            '@justeat/f-error-message': '@justeat/f-error-message',
            '@justeat/f-form-field': '@justeat/f-form-field',
            '@justeat/f-link': '@justeat/f-link'
        });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    },
    configureWebpack: {
        plugins: [
            new PeerDepsExternalsPlugin()
        ]
    }
};
