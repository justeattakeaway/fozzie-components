const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const navigationLinks = require('../../test-utils/component-objects/f-navigationLinks.component');

describe('f-navigationLinks component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(navigationLinks.componentType, navigationLinks.componentName, navigationLinks.path);

        navigationLinks.open(pageUrl)
        navigationLinks.waitForComponent();
    });

    it('should display the f-navigationLinks component', () => {
        // Assert
        expect(navigationLinks.isComponentDisplayed()).toBe(true);
    });
});
