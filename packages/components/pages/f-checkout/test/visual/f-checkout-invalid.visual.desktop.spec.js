import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Invalid - Desktop Visual Tests', () => {
    it('should display the error page component if the url is invalid', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'invalid-url' });
        checkout.withQuery('args', args);

        // Act
        checkout.loadError();
        // Assert
        browser.percyScreenshot('f-checkout - Invalid - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has invalid products', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ getBasketError: 'invalid-products' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Invalid products - Base State', 'desktop');
    });

    it('should display an error dialog if the basket has offline products', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ getBasketError: 'offline-products' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Offline products - Base State', 'desktop');
    });

    it('should display an error dialog if age verification is required', () => {
        checkout = new Checkout();

        const args = argumentStringBuilder({ getBasketError: 'age-restriction' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();

        // Assert
        browser.percyScreenshot('f-checkout - Basket error: Age restriction required - Base State', 'desktop');
    });
});
