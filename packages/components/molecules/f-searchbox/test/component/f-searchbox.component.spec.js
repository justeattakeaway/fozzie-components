import Searchbox from '../../test-utils/component-objects/f-searchbox.component';

describe('f-searchbox component tests', () => {
    it('should display the f-searchbox component', async () => {
        // Act
        await Searchbox.load();

        // Assert
        await expect(await Searchbox.isComponentDisplayed()).toBe(true);
    });
});
