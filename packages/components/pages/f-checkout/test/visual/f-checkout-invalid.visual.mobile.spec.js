import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Mobile Visual Tests', () => {
    it('should display the "Get Checkout" error page', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ getCheckoutOptions: '500' });
        checkout.withQuery('args', args);

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout" Error Page', 'mobile');
    });

    it('should display the "Get Checkout 403" error page', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ getCheckoutOptions: '403' });
        checkout.withQuery('args', args);

        // Act
        checkout.loadError();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', 'mobile');
    });
});
