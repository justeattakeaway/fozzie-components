// const magicImporter = require('node-sass-magic-importer');
// const eyeglass = require('eyeglass');

module.exports = function init () {
    return {
        sassOptions: {
            includePaths: ['node_modules/']
        },
        sourceMap: true
    };
};
