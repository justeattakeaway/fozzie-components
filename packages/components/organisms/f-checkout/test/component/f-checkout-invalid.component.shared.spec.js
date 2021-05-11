const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "invalid" component tests - @browserstack', () => {
    beforeEach(() => {
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'Invalid URL')
        .withQuery('&knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl);
        checkout.waitForErrorPageComponent();
    });

    it('should not display the checkout component', () => {
        // Assert
        expect(checkout.isComponentDisplayed()).toBe(false);
    });

    it('should display the error page component', () => {
        // Assert
        expect(checkout.isErrorPageComponentDisplayed()).toBe(true);
    });

    it('should display elements within error page component', () => {
        // Assert
        expect(checkout.isErrorPageImageDisplayed()).toBe(true);
        expect(checkout.isErrorPageHeadingDisplayed()).toBe(true);
        expect(checkout.isErrorPageDescriptionDisplayed()).toBe(true);
    });
});
