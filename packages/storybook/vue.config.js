const magicImporter = require('node-sass-magic-importer');
const path = require('path');
const eyeglass = require('eyeglass');

const rootDir = path.join(__dirname, '..', '..');

const sassOptions = eyeglass({
    eyeglass: {
        root: rootDir
    },
    includePaths: ['node_modules/'],
    sourceMap: true
});

sassOptions.importer = [
    magicImporter({
        cwd: rootDir
    }),
    sassOptions.importer
];

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
                data ({ resourcePath }) {
                    const absPath = path.join(
                        resourcePath,
                        ...(new Array(resourcePath.split(path.sep).reverse().indexOf('src')).fill('..')),
                        'assets/scss/common.scss'
                    );
                    const relPath = path.relative(path.dirname(resourcePath), absPath)
                        .replace(new RegExp(path.sep.replace('\\', '\\\\'), 'g'), '/');
                    return `@import "@justeat/fozzie/src/scss/fozzie"; @import "${relPath}";`;
                }
            });
    }
};
