import ImageTile from '../../test-utils/component-objects/f-image-tile.component';

describe('f-image-tile component tests', () => {
    beforeEach(async () => {
        await ImageTile.load();
    });

    it('should display the f-image-tile component', async () => {
        // Assert
        await expect(await ImageTile.isComponentDisplayed()).toBe(true);
    });

    it('should check that the f-image-tile component is clickable', async () => {
        // Assert
        await expect(await ImageTile.isComponentClickable()).toBe(true);
    });
});
