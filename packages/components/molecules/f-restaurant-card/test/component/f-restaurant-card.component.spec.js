import RestaurantCard from '../../test-utils/component-objects/f-restaurant-card.component';

describe('f-restaurant-card component tests', () => {
    it('should display the f-restaurant-card component', async () => {
        // Act
        await RestaurantCard.load();

        // Assert
        await expect(await RestaurantCard.isComponentDisplayed()).toBe(true);
    });
});
