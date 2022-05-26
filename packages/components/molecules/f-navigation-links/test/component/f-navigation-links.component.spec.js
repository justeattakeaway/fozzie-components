const NavigationLinks = require('../../test-utils/component-objects/f-navigation-links.component');

let navigationLinks;

describe('f-navigation-links component tests', () => {
    beforeEach(async () => {
        navigationLinks = new NavigationLinks();

        await navigationLinks.load();
    });

    it('should display the f-navigation-links component', async () => {
        // Assert
        await expect(await navigationLinks.isComponentDisplayed()).toBe(true);
    });
});
