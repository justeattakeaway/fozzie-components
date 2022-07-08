import RestaurantCard from '../../test-utils/component-objects/f-restaurant-card.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-restaurant-card component WCAG compliance', async () => {
        // Act
        await RestaurantCard.load();
        const axeResults = await RestaurantCard.getAxeResults('f-restaurant-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
