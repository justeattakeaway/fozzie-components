// const magicImporter = require('node-sass-magic-importer');
// const eyeglass = require('eyeglass');

module.exports = function init () {
// module.exports = function init (rootDir) {
//     const sassOptions = eyeglass({
//         eyeglass: {
//             root: rootDir
//         },
//         includePaths: ['node_modules/']
//     });

    //     sassOptions.importer = [
    //         magicImporter({
    //             cwd: rootDir
    //         }),
    //         sassOptions.importer
    //     ];

    //     return {
    //         sassOptions: {
    //             eyeglass: sassOptions.eyeglass,
    //             functions: sassOptions.functions,
    //             includePaths: sassOptions.includePaths,
    //             importer: sassOptions.importer
    //         },
    //         sourceMap: true
    //     };
    return {
        sassOptions: {
            includePaths: ['node_modules/']
        },
        sourceMap: true
    };
};
