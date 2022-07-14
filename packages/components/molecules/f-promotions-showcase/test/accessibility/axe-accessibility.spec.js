import PromotionsShowcase from '../../test-utils/component-objects/f-promotions-showcase.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-promotions-showcase component WCAG compliance', async () => {
        // Act
        await PromotionsShowcase.load();
        const axeResults = await PromotionsShowcase.getAxeResults('f-promotions-showcase');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
