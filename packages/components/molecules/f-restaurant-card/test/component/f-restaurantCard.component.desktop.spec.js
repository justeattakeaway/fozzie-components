const RestaurantCard = require('../../test-utils/component-objects/f-restaurantCard.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

describe('f-restaurantCard component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(restaurantCard.componentType, restaurantCard.componentName, restaurantCard.path);

        restaurantCard.open(pageUrl)
        restaurantCard.waitForComponent();
    });

    it('should display the f-restaurantCard component', () => {
        // Assert
        expect(restaurantCard.isComponentDisplayed()).toBe(true);
    });
});
