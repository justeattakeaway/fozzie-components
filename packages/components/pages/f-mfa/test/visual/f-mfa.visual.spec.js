import forEach from 'mocha-each';

const Mfa = require('../../test-utils/component-objects/f-mfa.component');

forEach(['desktop', 'mobile'])
.describe('f-mfa - %s - Visual tests', device => {
    let mfa;

    beforeEach(() => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        mfa = new Mfa();
    });

    it('should display the f-mfa component', async () => {
        // Act
        await mfa.load();

        // Assert
        await browser.percyScreenshot('f-mfa - Visual Test', device);
    });
});
