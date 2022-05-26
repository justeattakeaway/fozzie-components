const CardWithContent = require('../../test-utils/component-objects/f-card-with-content.component');

const cardWithContent = new CardWithContent();

describe('f-card-with-content component tests', () => {
    beforeEach(async () => {
        await cardWithContent.load();
    });

    it('should display the f-card-with-content component', async () => {
        // Assert
        await expect(await cardWithContent.isComponentDisplayed()).toBe(true);
    });
});
