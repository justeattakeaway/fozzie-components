const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

describe('f-loyalty component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(loyalty.componentType, loyalty.componentName, loyalty.path);

        loyalty.open(pageUrl)
        loyalty.waitForComponent();
    });

    it('should display the f-loyalty component', () => {
        // Assert
        expect(loyalty.isComponentDisplayed()).toBe(true);
    });
});
