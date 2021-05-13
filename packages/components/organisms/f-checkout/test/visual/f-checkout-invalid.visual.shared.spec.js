const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout - Invalid - Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: true,
            isValid: false
        };

        checkout.open(checkoutData);
        checkout.waitForErrorPageComponent();
    });

    it('should display the error page component', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'shared');
    });
});