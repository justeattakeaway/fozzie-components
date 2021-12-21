const RestaurantCard = require('../../test-utils/component-objects/f-restaurant-card.component');

const restaurantCard = new RestaurantCard();

describe('f-restaurant-card component tests', () => {
    beforeEach(() => {
        restaurantCard.load();
    });

    it('should display the f-restaurant-card component', () => {
        // Assert
        expect(restaurantCard.isComponentDisplayed()).toBe(true);
    });
});
