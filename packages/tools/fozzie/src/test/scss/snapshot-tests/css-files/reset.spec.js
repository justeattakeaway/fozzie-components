const path = require('path');
const cssCompiler = require('../../../../utilities/cssCompiler');

describe('fozzie-reset.scss', () => {
    it('compiles the expected CSS', () => {
        // arrange
        const scssAbsolutePath = path.join(process.cwd(), 'src', 'scss', 'fozzie-reset.scss');

        // act
        const cssResult = cssCompiler.compile({ scssPath: scssAbsolutePath, useLegacyRenderer: true });

        // assert
        expect(cssResult).toMatchSnapshot();
    });
});
