const ImageTile = require('../../test-utils/component-objects/f-imageTile.component');

const imageTile = new ImageTile();

describe('f-imageTile component tests', () => {
    beforeEach(() => {
        imageTile.load();
    });

    it('should display the f-restaurantCard component', () => {
        // Assert
        expect(imageTile.isComponentDisplayed()).toBe(true);
    });
});
