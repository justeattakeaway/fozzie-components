const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Mobile Visual Tests', () => {
    const checkoutInfo = {
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
    });


    it('should display the error page component if the url is invalid', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'invalid-url'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'mobile');
    });

    it('should display the "Get Checkout 403" error page', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getCheckoutOptions: '403'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', 'mobile');
    });

    it('should display an error dialog if the basket has invalid products', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'invalid-products'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'mobile');
    });

    it('should display an error dialog if the basket has offline products', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'offline-products'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'mobile');
    });

    it('should display an error dialog if age verification is required', () => {
        checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'age-restriction'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'mobile');
    });
});
