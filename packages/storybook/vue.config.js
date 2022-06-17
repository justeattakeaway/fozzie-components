const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const assetsPlugin = require('postcss-assets');
const sassOptions = require('../../config/sassOptions')(rootDir);

// vue.config.js
module.exports = {
    chainWebpack: config => {
        // console.log(config.module.rules);
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
                additionalData (content, { resourcePath, rootContext }) {
                    const relativePath = path.relative(rootContext, resourcePath);
                    const levelsUpToSrc = relativePath.split(path.sep).reverse().indexOf('src');

                    // Only attempt to add common styles when under a src dir
                    if (levelsUpToSrc === -1) {
                        return `${content}`;
                    }

                    const absPath = path.join(
                        resourcePath,
                        ...(new Array(levelsUpToSrc).fill('..')),
                        'assets/scss/common.scss'
                    );
                    const relPath = path.relative(path.dirname(resourcePath), absPath)
                        .replace(new RegExp(path.sep.replace('\\', '\\\\'), 'g'), '/');

                    // add component names 1 by 1 to this array as they're updated
                    // to the new Sass syntax OR the entire component folder if all completed
                    // i.e. // [ 'atoms', 'molecules', 'f-checkout' ]
                    const updateComponentsAndTypes = ['f-button', 'f-card', 'f-error-message', 'f-filter-pill', 'f-form-field', 'f-image-tile'];
                    const pathContainsUpdatedComponentOrType = updateComponentsAndTypes.some(a => absPath.includes(a));

                    if (!pathContainsUpdatedComponentOrType) {
                        return `
                        @use "sass:math";
                        @import "${relPath}";
                        ${content}`;
                    }

                    return `
                        @use "sass:math";
                        @use "${relPath}" as *;
                        ${content}`;
                }
            });

        config.module
            .rule('i18n')
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use('i18n')
              .loader('@kazupon/vue-i18n-loader')
              .end();

        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    assetsPlugin
                ]
            }
        }
    }
};
