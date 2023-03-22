/**
 * This is a test setup file that enables Jest to run Scss unit tests using the sass-true library
 * The single describe block bootstraps the test runner by finding all scss unit test files and running
 * sass-true against them.
 *
 * No actual tests should live in this file.
 */

const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

describe('SCSS', () => {
    it('setup', () => {
        // All Scss unit tests should follow this naming convention
        const testFileGlob = '**/*.spec.scss';
        const testFilePathGlob = path.resolve(process.cwd(), testFileGlob);

        // Find all of the Scss files that end in `*.spec.scss` in any directory of this project
        const scssTestFiles = glob.sync(testFilePathGlob);

        // Run True on every file found with the describe and it methods provided
        scssTestFiles.forEach(file => sassTrue.runSass({ file, includePaths: ['node_modules'] }, { describe, it }));
    });
});
