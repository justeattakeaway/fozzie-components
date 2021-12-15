const path = require('path');

const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

const rootDir = path.join(__dirname, '..', '..');
const sassOptions = require('../../../../config/sassOptions')(rootDir);
const responseLoggedIn = require('./src/components/_tests/__mocks__/api.account.details.json');
const responseLoggedOut = require('./src/components/_tests/__mocks__/api.account.details.loggedout.json');

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
    devServer: {
        port: 8080,
        before (app) {
            // The header component makes an API call to get information about the current user
            app.get('/api/account/details', (req, res) => {
                const ref = req.headers.referer || req.headers.referrer;
                const isLoggedIn = ref.includes('testuser');
                if (isLoggedIn) {
                    res.json(responseLoggedIn);
                } else {
                    res.json(responseLoggedOut);
                }
            });
        }
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
