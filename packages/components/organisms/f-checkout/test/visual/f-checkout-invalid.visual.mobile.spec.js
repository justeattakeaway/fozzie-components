const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Mobile Visual Tests', () => {

    it('should display the "Get Checkout" error page', () => {
        // Act
        checkout.loadError({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Get Checkout Errors': '500'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout" Error Page', 'mobile');
    });

    it('should display the "Get Checkout 403" error page', () => {
        // Act
        checkout.loadError({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Get Checkout Errors': '403'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', 'mobile');
    });
});
