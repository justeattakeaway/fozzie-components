import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;
let checkoutInfo;

forEach(['desktop', 'mobile'])
.describe('f-checkout - Invalid - Visual Tests', device => {
    it('should display the "Get Checkout" error page', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            errorCode: '500'
        };
        checkout.withQuery('&knob-Get Checkout Errors', checkoutInfo.errorCode);

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout" Error Page', device);
    });

    it('should display the "Get Checkout 403" error page', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            errorCode: '403'
        };
        checkout.withQuery('&knob-Get Checkout Errors', checkoutInfo.errorCode);

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', device);
    });
});
