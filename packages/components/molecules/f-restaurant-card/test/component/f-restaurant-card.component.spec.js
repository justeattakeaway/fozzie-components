const RestaurantCard = require('../../test-utils/component-objects/f-restaurant-card.component');

const restaurantCard = new RestaurantCard();

describe('f-restaurant-card component tests', () => {
    beforeEach(async () => {
        await restaurantCard.load();
    });

    it('should display the f-restaurant-card component', async () => {
        // Assert
        await expect(await restaurantCard.isComponentDisplayed()).toBe(true);
    });
});
