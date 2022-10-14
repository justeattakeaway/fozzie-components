const sass = require('sass');
const getSubdirectories = require('./getSubdirectories');

/**
 * Compiles an SCSS file or string into to a string of CSS
 * @param {Object} options a configuration object
 * @param {string} options.scssPath an absolute path to an SCSS file to compile (either use this or data, not both)
 * @param {string} options.scssString a string of SCSS to compile (either use this or scssPath, not both)
 * @param {boolean} options.useLegacyRenderer whether or not to use the legacy sass renderSync function. This should be true if calling the function from a test runner such as Jest.
 * @param {Object} options.sassCompilationOptions Any compilation options. See: https://sass-lang.com/documentation/js-api/interfaces/Options or Legacy: https://sass-lang.com/documentation/js-api/interfaces/LegacySharedOptions
 *
 * @returns string - The compiled CSS
 */
const compile = ({
    scssPath,
    scssString,
    useLegacyRenderer,
    sassCompilationOptions
}) => {
    if (!scssPath && !scssString) {
        throw new Error('Missing argument: either `scssPath` or `scssString` must be provided to compile into CSS');
    } else if (scssPath && scssString) {
        throw new Error('Invalid Arguments: only provide either `scssPath` or `scssString` to compile into CSS');
    }

    const loadPaths = [
        // make all SCSS directories available so lines like `@use 'fozzie' as f` work without requiring relative paths
        ...getSubdirectories.getAllSubdirectoryPaths('./src/scss'),
        'node_modules'
    ];

    let result;

    // This is probably only ever going to run when compiling from Jest.
    // Unfortunately the newer .compile function does not appear to work with Jest.
    // This appears to be the approach taken by other libraries such as IBM's Carbon Design System.
    if (useLegacyRenderer) {
        const cssResult = sass.renderSync({
            ...(scssPath) && { file: scssPath },
            ...(scssString) && { data: scssString },
            includePaths: loadPaths,
            ...sassCompilationOptions
        });

        result = cssResult.css.toString();
    } else {
        const cssResult = scssPath
            ? sass.compile(scssPath, {
                loadPaths,
                ...sassCompilationOptions
            })
            : sass.compileString(scssString, {
                loadPaths,
                ...sassCompilationOptions
            });

        result = cssResult.css;
    }

    return result;
};

module.exports = {
    compile
};
