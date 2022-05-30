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

    it('should display the error page component if the url is invalid', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'invalid-url' });
        checkout.withQuery('args', args);

        // Act
        checkout.loadError();
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'mobile');
    });

    it('should display an error dialog if the basket has invalid products', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ getBasketError: 'invalid-products' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'mobile');
    });

    it('should display an error dialog if the basket has offline products', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ getBasketError: 'offline-products' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'mobile');
    });

    it('should display an error dialog if age verification is required', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ getBasketError: 'age-restriction' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'mobile');
    });
});
