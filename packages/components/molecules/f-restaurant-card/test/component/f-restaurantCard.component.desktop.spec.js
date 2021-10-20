const RestaurantCard = require('../../test-utils/component-objects/f-restaurantCard.component');

const restaurantCard = new RestaurantCard();

describe('f-restaurantCard component tests', () => {
    beforeEach(() => {
        restaurantCard.load();
    });

    it('should display the f-restaurantCard component', () => {
        // Assert
        expect(restaurantCard.isComponentDisplayed()).toBe(true);
    });
});
