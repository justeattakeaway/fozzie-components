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

        const args = await argumentStringBuilder({ serviceType: 'invalid-url' });
        await checkout.withQuery('args', args);

    it('should display the error page component if the url is invalid', () => {
        // Act
        await checkout.load({
            ...checkoutInfo,
            serviceType: 'invalid-url'
        });
        // Assert
        await browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has invalid products', async () => {
        // Act
        await checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'invalid-products'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has offline products', async () => {
        // Act
        await checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'offline-products'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'desktop');
    });

    it('should display an error dialog if age verification is required', async () => {
        // Act
        await checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'age-restriction'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'desktop');
    });

    it('should display the error page component', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });
});
