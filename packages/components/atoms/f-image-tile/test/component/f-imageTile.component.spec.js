const ImageTile = require('../../test-utils/component-objects/f-imageTile.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const imageTile = new RestaurantCard();

describe('f-imageTile component tests', () => {
    beforeEach(() => {
        imageTile.load();
    });

    it('should display the f-restaurantCard component', () => {
        // Assert
        expect(imageTile.isComponentDisplayed()).toBe(true);
    });
});
