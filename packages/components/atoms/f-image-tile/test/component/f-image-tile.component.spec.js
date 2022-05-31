const ImageTile = require('../../test-utils/component-objects/f-image-tile.component');

const imageTile = new ImageTile();

describe('f-image-tile component tests', () => {
    beforeEach(async () => {
        await imageTile.load(imageTile.component);
    });

    it('should display the f-image-tile component', async () => {
        // Assert
        await expect(await imageTile.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-image-tile component is clickable', async () => {
        // Assert
        await expect(await imageTile.isComponentClickable()).toBe(true);
    });
});
