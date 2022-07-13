import NavigationLinks from '../../test-utils/component-objects/f-navigation-links.component';

describe('f-navigation-links component tests', () => {
    it('should display the f-navigation-links component', async () => {
        // Arrange
        await NavigationLinks.load();

        // Assert
        await expect(await NavigationLinks.isComponentDisplayed()).toBe(true);
    });
});
