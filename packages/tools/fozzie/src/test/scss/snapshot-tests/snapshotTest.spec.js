const path = require('path');
const cssCompiler = require('../../../utilities/cssCompiler');
// const cssLinter = require('../../../utilities/cssLinter');

describe('Compiled CSS output', () => {
    it('compiles the expected CSS', () => {
        // arrange
        const scssAbsolutePath = path.join(process.cwd(), 'src', 'test', 'scss', 'data', 'fozzie-snapshot.scss');

        // act
        const cssResult = cssCompiler.compile({ scssPath: scssAbsolutePath, useLegacyRenderer: true });

        // assert
        expect(cssResult).toMatchSnapshot();
    });

    // TODO: add tests to ensure that simply calling `@use 'fozzie'` does not render any styles/comments
    // TODO: Our compiled CSS is not currently valid! We should fix this and enable this test in the near future
    // TODO: We will need to decide whether or not to run PostCSS against the compiled CSS before linting to sort out things like `inline` for background images
    // it('Outputs valid CSS', async () => {
    //     // arrange
    //     const scssAbsolutePath = path.join(path.resolve(__dirname), '..', 'data', 'fozzie-snapshot.scss');

    //     // act
    //     const cssResult = cssCompiler.compile({ scssPath: scssAbsolutePath, useLegacyRenderer: true });

    //     // assert
    //     const lintResult = await cssLinter.lintCSS(cssResult);

    //     expect(lintResult.errored).toBe(false);
    // });
});
