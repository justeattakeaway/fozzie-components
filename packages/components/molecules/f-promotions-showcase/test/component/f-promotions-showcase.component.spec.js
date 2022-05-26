const PromotionsShowcase = require('../../test-utils/component-objects/f-promotions-showcase.component');

const promotionsShowcase = new PromotionsShowcase();

describe('f-promotions-showcase component tests', () => {
    beforeEach(async () => {
        await promotionsShowcase.load();
    });

    it('should display the f-promotions-showcase component', async () => {
        // Assert
        await expect(await promotionsShowcase.isComponentDisplayed()).toBe(true);
    });
});
