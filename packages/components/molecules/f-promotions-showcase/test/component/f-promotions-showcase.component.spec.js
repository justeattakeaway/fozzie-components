import PromotionsShowcase from '../../test-utils/component-objects/f-promotions-showcase.component';

describe('f-promotions-showcase component tests', () => {
    it('should display the f-promotions-showcase component', async () => {
        // Act
        await PromotionsShowcase.load();

        // Assert
        await expect(await PromotionsShowcase.isComponentDisplayed()).toBe(true);
    });
});
