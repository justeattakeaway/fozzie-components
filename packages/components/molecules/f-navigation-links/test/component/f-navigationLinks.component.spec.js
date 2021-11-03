const NavigationLinks = require('../../test-utils/component-objects/f-navigationLinks.component');

let navigationLinks;

describe('f-navigationLinks component tests', () => {
    beforeEach(() => {
        navigationLinks = new NavigationLinks();

        navigationLinks.load();
        navigationLinks.waitForComponent();
    });

    it('should display the f-navigationLinks component', () => {
        // Assert
        expect(navigationLinks.isComponentDisplayed()).toBe(true);
    });
});
