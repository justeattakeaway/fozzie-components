const Card = require('../../test-utils/component-objects/f-card.component');

const card = new Card();

describe('f-card component tests', () => {
    beforeEach(async () => {
        await card.load();
    });

    it('should display the f-card component', async () => {
        // Assert
        await expect(await card.isComponentDisplayed()).toBe(true);
    });
});
