const path = require('path');
const cssCompiler = require('../../../../utilities/cssCompiler');

describe('fozzie-utilities.scss', () => {
    it('compiles the expected CSS', () => {
        // arrange
        const scssAbsolutePath = path.join(process.cwd(), 'src', 'scss', 'fozzie-utilities.scss');

        // act
        const cssResult = cssCompiler.compile({ scssPath: scssAbsolutePath, useLegacyRenderer: true });

        // assert
        expect(cssResult).toMatchSnapshot();
    });
});
