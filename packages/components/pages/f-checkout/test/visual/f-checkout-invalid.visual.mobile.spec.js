const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;
let checkoutInfo;

describe('f-checkout - Invalid - Mobile Visual Tests', () => {

    it('should display the "Get Checkout" error page', () => {
        // Arrange
        checkout = new Checkout(Checkout.mode.guestUser);
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: true,
            errorCode: '500'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Get Checkout Errors', checkoutInfo.errorCode);

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout" Error Page', 'mobile');
    });

    it('should display the "Get Checkout 403" error page', () => {
        // Arrange
        checkout = new Checkout(Checkout.mode.guestUser);
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: true,
            isASAP: true,
            errorCode: '403'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Get Checkout Errors', checkoutInfo.errorCode);

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', 'mobile');
    });
});
