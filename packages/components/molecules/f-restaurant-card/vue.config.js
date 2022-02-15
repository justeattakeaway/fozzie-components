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
                additionalData (content, { resourcePath }) {
                    const levelsUpToSrc = resourcePath.split(path.sep).reverse().indexOf('src');

                    const absPath = path.join(
                        resourcePath,
                        ...(new Array(levelsUpToSrc).fill('..')),
                        'assets/scss/common.scss'
                    );
                    const relPath = path.relative(path.dirname(resourcePath), absPath)
                        .replace(new RegExp(path.sep.replace('\\', '\\\\'), 'g'), '/');

                    return `
                        @use "sass:math";
                        @import "${relPath}";
                        ${content}`;
                }
            });
    },
    pluginOptions: {
        lintStyleOnBuild: true
    }
};
