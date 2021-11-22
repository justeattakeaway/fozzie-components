/* global browser */

const CardWithContent = require('../../test-utils/component-objects/f-cardWithContent.component');

let cardWithContent = new CardWithContent();
const MOBILE = 'mobile';

describe('f-card-with-content - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        cardWithContent = new CardWithContent();

        // Act
        cardWithContent.load();
    });

    it('should display default component state', () => {
        // Assert
        browser.percyScreenshot('f-card-with-content - Base State', MOBILE);
    });
});
