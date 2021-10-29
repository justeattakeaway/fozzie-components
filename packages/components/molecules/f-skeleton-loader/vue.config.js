const path = require('path');
const packageJson = require('./package.json');

const rootDir = path.join(__dirname, '..', '..');
const sassOptions = require('../../../../config/sassOptions')(rootDir);

// vue.config.js
module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: `[name]__${packageJson.version}--[hash:base64:7]`
                },
                localsConvention: 'camelCaseOnly'
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('scss-importer')
            .test(/\.scss$/)
            .use('importer')
            .loader('sass-loader')
            .options({
                ...sassOptions,
                /**
                 * Requires sass-loader 7.3.1 - works out the relative path for the common.scss file for each component
                 *
                 * @param resourcePath
                 * @returns {string}
                 */
                additionalData (content, { resourcePath }) {
                    const levelsUpToSrc = resourcePath.split(path.sep).reverse().indexOf('src');

                    const absPath = path.join(
                        resourcePath,
                        ...(new Array(levelsUpToSrc).fill('..')),
                        'assets/scss/common.scss'
                    );
                    const relPath = path.relative(path.dirname(resourcePath), absPath)
                        .replace(new RegExp(path.sep.replace('\\', '\\\\'), 'g'), '/');

                    return `@import "${relPath}";
                            ${content}`;
                }
            });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
