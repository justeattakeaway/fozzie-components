const PromotionsShowcase = require('../../test-utils/component-objects/f-promotionsShowcase.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

describe('f-promotionsShowcase component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(promotionsShowcase.componentType, promotionsShowcase.componentName, promotionsShowcase.path);

        promotionsShowcase.open(pageUrl)
        promotionsShowcase.waitForComponent();
    });

    it('should display the f-promotionsShowcase component', () => {
        // Assert
        expect(promotionsShowcase.isComponentDisplayed()).toBe(true);
    });
});
