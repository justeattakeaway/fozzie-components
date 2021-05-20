const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'invalid-url');

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForErrorPageComponent();
    });

    it('should display the error page component', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'shared');
    });
});
