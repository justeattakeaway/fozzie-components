import Checkout from '../../test-utils/component-objects/f-checkout.component';
import CheckoutError from '../../test-utils/component-objects/f-checkout-error.component';
import CheckoutAgeVerification from '../../test-utils/component-objects/f-checkout-age-verification';

describe('f-checkout - Invalid - Desktop Visual Tests', () => {
    const checkoutInfo = {
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    it('should display the error page component if the url is invalid', async () => {
        // Act
        await CheckoutError.load({
            ...checkoutInfo,
            serviceType: 'invalid-url'
        });
        // Assert
        await browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has invalid products', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'invalid-products'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has offline products', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'offline-products'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'desktop');
    });

    it('should display an error dialog if age verification is required', async () => {
        // Act
        CheckoutAgeVerification.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'age-restriction'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'desktop');
    });
});
