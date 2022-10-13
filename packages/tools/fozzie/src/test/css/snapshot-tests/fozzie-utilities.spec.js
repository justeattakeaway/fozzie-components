const testHelpers = require('../helpers');

describe('fozzie-utilities', () => {
    const fileNameBase = 'fozzie-utilities';

    describe('CSS files', () => {
        it('compiles the expected CSS file', () => {
            // arrange
            const cssFileName = `${fileNameBase}.css`;

            // act
            const cssOutput = testHelpers.getCssDistFile(cssFileName);

            // assert
            expect(cssOutput).toMatchSnapshot();
        });

        it('compiles the expected minified CSS file', () => {
            // arrange
            const minifiedCssFileName = `${fileNameBase}.min.css`;

            // act
            const cssOutput = testHelpers.getCssDistFile(minifiedCssFileName);

            // assert
            expect(cssOutput).toMatchSnapshot();
        });
    });

    describe('sourcemap file', () => {
        it('compiles the expected sourcemap file', () => {
            // arrange
            const sourcemapFileName = `${fileNameBase}.css.map`;

            // act
            const sourcemapOutput = testHelpers.getCssDistFile(sourcemapFileName);

            // assert
            expect(sourcemapOutput).toMatchSnapshot();
        });
    });
});
