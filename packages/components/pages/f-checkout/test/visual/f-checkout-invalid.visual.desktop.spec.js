const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Desktop Visual Tests', () => {
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
            serviceType: 'invalidUrl'
        });
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has invalid products', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'invalid-products'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has offline products', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'collection',
            getBasketError: 'offline-products'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'desktop');
    });

    it('should display an error dialog if age verification is required', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'age-restriction'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'desktop');
    });
});
