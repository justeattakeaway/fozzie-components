import CheckoutError from '../../test-utils/component-objects/f-checkout-error.component';
import Checkout from '../../test-utils/component-objects/f-checkout.component';
import CheckoutAgeVerification from '../../test-utils/component-objects/f-checkout-age-verification';

describe('f-checkout - Invalid - Mobile Visual Tests', () => {
    const checkoutInfo = {
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    it('should display the error page component if the url is invalid', async () => {
        // Act
        CheckoutError.load({
            ...checkoutInfo,
            serviceType: 'invalid-url'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Invalid - Base State', 'mobile');
    });

    it('should display the "Get Checkout 403" error page', async () => {
        // Act
        Checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getCheckoutOptions: '403'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Get Checkout 403" Error Page', 'mobile');
    });

    it('should display an error dialog if the basket has invalid products', async () => {
        // Act
        Checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'invalid-products'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'mobile');
    });

    it('should display an error dialog if the basket has offline products', async () => {
        // Act
        Checkout.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'offline-products'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'mobile');
    });

    it('should display an error dialog if age verification is required', async () => {
        CheckoutAgeVerification.load({
            ...checkoutInfo,
            serviceType: 'delivery',
            getBasketError: 'age-restriction'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'mobile');
    });
});
