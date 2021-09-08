const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');

describe('f-loyalty component tests', () => {
    let loyalty;
    beforeEach(() => {
        loyalty = new Loyalty();

        const pageUrl = buildUrl(loyalty.componentType, loyalty.componentName, loyalty.path);

        loyalty.open(pageUrl);
        loyalty.waitForComponent();
    });

    it('should display the f-loyalty component', () => {
        // Assert
        expect(loyalty.isComponentDisplayed()).toBe(true);
    });
});
