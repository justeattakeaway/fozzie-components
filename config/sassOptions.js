const magicImporter = require('node-sass-magic-importer');
const eyeglass = require('eyeglass');

module.exports = function init (rootDir) {
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

    return sassOptions;
};
