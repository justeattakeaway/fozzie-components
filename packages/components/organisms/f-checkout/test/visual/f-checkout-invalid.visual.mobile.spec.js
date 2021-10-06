const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Mobile Visual Tests', () => {

    it('should display the "Get Checkout" error page', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Is ASAP available', true)
            .withQuery('&knob-Get Checkout Errors', '500')

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout" Error Page', 'mobile');
    });

    it('should display the "Get Checkout 403" error page', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Is ASAP available', true)
            .withQuery('&knob-Get Checkout Errors', '403')

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', 'mobile');
    });
});
