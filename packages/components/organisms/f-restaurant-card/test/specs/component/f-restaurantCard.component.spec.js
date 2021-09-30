import RestaurantCardComponent from '../../../test-utils/component-objects/f-restaurantCard.component';

describe('f-restaurantCard component tests', () => {
    beforeEach(() => {
        browser.url('?path=story/components-organisms--restaurant-card-component');
        browser.switchToFrame(0);
        RestaurantCardComponent.waitForRestaurantCardComponent();
    });

    it('should display the f-restaurantCard component', () => {
        // Assert
        expect(RestaurantCardComponent.isRestaurantCardComponentDisplayed()).toBe(true);
    });
});
