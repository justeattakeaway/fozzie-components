const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const contactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

describe('f-contactPreferences component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(contactPreferences.componentType, contactPreferences.componentName, contactPreferences.path);

        contactPreferences.open(pageUrl);
        contactPreferences.waitForComponent();
    });

    it('should display the f-contactPreferences component', () => {
        // Assert
        expect(contactPreferences.isComponentDisplayed()).toBe(true);
    });
});
