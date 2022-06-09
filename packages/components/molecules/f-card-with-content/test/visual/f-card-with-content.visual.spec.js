import forEach from 'mocha-each';

const CardWithContent = require('../../test-utils/component-objects/f-card-with-content.component');

let cardWithContent;

forEach(['desktop', 'mobile'])
.describe('f-card-with-content - %s Visual Tests', device => {
    beforeEach(() => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }
        cardWithContent = new CardWithContent();
    });

    it('should display default component state', async () => {
        // Act
        await cardWithContent.load();

        // Assert
        browser.percyScreenshot('f-card-with-content - Base State', device);
    });
});
