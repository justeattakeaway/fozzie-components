import HomePromotionCard1 from '../../test-utils/component-objects/f-content-cards-home-promotion-card1.component';
import HomePromotionCard2 from '../../test-utils/component-objects/f-content-cards-home-promotion-card2.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-content-card component WCAG compliance', async () => {
        // Act
        await HomePromotionCard1.load();
        const axeResults = await HomePromotionCard1.getAxeResults('f-content-card-home-promotion-1');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-content-card component WCAG compliance', async () => {
        // Act
        await HomePromotionCard2.load();
        const axeResults = await HomePromotionCard2.getAxeResults('f-content-card-home-promotion-2');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
