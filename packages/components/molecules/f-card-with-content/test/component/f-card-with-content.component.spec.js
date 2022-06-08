const CardWithContent = require('../../test-utils/component-objects/f-card-with-content.component');

let cardWithContent;

describe('f-card-with-content component tests', () => {
    beforeEach(async () => {
        // Arrange
        cardWithContent = new CardWithContent();
    });

    it('should display the f-card-with-content component', async () => {
        // Act
        await cardWithContent.load();
        const result = await cardWithContent.isComponentDisplayed();

        // Assert
        await expect(result).toBe(true);
    });
});
