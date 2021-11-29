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
                additionalData: `@import "../assets/scss/common.scss";`
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
