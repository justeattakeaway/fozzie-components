const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const sassOptions = require('../../../../config/sassOptions')(rootDir);

let vueConfig = null;

if(process.env.COMPONENT_TYPE === 'vue') {
    vueConfig = {
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
                'js-cookie': 'js-cookie'
            });
        },
        pluginOptions: {
            lintStyleOnBuild: true
        }
    }
}
else {
    vueConfig = {
        chainWebpack: config => {
            config.module.rules.delete('eslint');
        },
        pluginOptions: {
            prerenderSpa: {
                registry: undefined,
                renderRoutes: [
                    '/'
                ],
                useRenderEvent: true,
                headless: true,
                onlyProduction: true
            }
        }
    }
}

module.exports = vueConfig;
