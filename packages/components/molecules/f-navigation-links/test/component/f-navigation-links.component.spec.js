const NavigationLinks = require('../../test-utils/component-objects/f-navigation-links.component');

let navigationLinks;

describe('f-navigation-links component tests', () => {
    beforeEach(() => {
        navigationLinks = new NavigationLinks();

        navigationLinks.load();
    });

    it('should display the f-navigation-links component', () => {
        // Assert
        expect(navigationLinks.isComponentDisplayed()).toBe(true);
    });
});
