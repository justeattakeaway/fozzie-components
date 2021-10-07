const IeCompatibility = require('../../test-utils/component-objects/f-ieCompatibility.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

describe('f-ieCompatibility component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(ieCompatibility.componentType, ieCompatibility.componentName, ieCompatibility.path);

        ieCompatibility.open(pageUrl)
        ieCompatibility.waitForComponent();
    });

    it('should display the f-ieCompatibility component', () => {
        // Assert
        expect(ieCompatibility.isComponentDisplayed()).toBe(true);
    });
});
