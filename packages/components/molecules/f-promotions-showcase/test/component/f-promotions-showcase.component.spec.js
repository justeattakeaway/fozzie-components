const PromotionsShowcase = require('../../test-utils/component-objects/f-promotions-showcase.component');

const promotionsShowcase = new PromotionsShowcase();

describe('f-promotions-showcase component tests', () => {
    beforeEach(() => {
        promotionsShowcase.load();
    });

    it('should display the f-promotions-showcase component', () => {
        // Assert
        expect(promotionsShowcase.isComponentDisplayed()).toBe(true);
    });
});
