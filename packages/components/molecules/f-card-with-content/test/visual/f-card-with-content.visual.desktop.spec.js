/* global browser */

const CardWithContent = require('../../test-utils/component-objects/f-cardWithContent.component');

let cardWithContent = new CardWithContent();
const DESKTOP = 'desktop';

describe('f-card-with-content - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        cardWithContent = new CardWithContent();

        // Act
        cardWithContent.load();
    });

    it('should display default component state', () => {
        // Assert
        browser.percyScreenshot('f-card-with-content - Base State', DESKTOP);
    });
});
