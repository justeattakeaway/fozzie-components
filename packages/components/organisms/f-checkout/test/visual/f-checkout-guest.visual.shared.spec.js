const Checkout = require('../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();

describe('f-checkout - Collection - Guest - Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: false,
            isValid: true,
            isAsapAvailable: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
        browser.pause(2000);
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'shared');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearCheckoutForm('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'shared');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: false,
            isValid: true,
            isAsapAvailable: false
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', 'shared');
    });
});


describe('f-checkout - Delivery - Guest - Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: false,
            isValid: true,
            isAsapAvailable: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the delivery f-checkout component guest base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'shared');
    });

    it('should display the delivery f-checkout guest mandatory error messages', () => {
        // Act
        ['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode']
            .forEach(field => checkout.clearCheckoutForm(field));

        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'shared');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Visual Tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: false,
            isValid: true,
            isAsapAvailable: false
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', 'shared');
    });
});
