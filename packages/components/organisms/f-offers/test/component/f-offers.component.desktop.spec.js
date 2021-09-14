const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Offers = require('../../test-utils/component-objects/f-offers.component');

describe('f-offers component tests', () => {
    let offers;
    beforeEach(() => {
        offers = new Offers();

        const pageUrl = buildUrl(offers.componentType, offers.componentName, offers.path);

        offers.open(pageUrl);
        offers.waitForComponent();
    });

    it('should display the f-offers component', () => {
        // Assert
        expect(offers.isComponentDisplayed()).toBe(true);
    });
});
