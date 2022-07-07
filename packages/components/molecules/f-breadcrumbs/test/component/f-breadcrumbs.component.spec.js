import Breadcrumbs from '../../test-utils/component-objects/f-breadcrumbs.component';

describe('f-breadcrumbs component tests', () => {
    it('should display the f-breadcrumbs component', async () => {
        // Act
        await Breadcrumbs.load();

        // Assert
        await expect(await Breadcrumbs.isComponentDisplayed()).toBe(true);
    });
});
