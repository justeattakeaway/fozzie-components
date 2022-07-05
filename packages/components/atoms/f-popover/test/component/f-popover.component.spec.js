import Popover from '../../test-utils/component-objects/f-popover.component';

describe('f-popover component tests', () => {
    it('should display the f-popover component', async () => {
        // Arrange
        await Popover.load();

        // Assert
        await expect(await Popover.isComponentDisplayed()).toBe(true);
    });
});
