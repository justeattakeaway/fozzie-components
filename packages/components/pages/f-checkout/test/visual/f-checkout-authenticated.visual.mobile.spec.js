const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Authenticated - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'collection',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages.', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'mobile');
    });

    it('should display the "Something went wrong" error.', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'SERVER'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'additional-items-required'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Additional Items Required" Error Modal', 'mobile');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'collection',
            isLoggedIn: true,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Delivery - Authenticated - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['addressLine1', 'addressLocality', 'mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Mandatory Errors', 'mobile');
    });

    it('should display the illegal postcode error message', () => {
        // Arrange
        const addressPostcode = 'TEST1A';

        // Act
        checkout.clearBlurField('addressPostcode');
        checkout.setFieldValue('addressPostcode', addressPostcode);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'mobile');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the two notes fields if there is two noteTypes.', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State - Two Notes Inputs', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'additional-items-required'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Additional Items Required" Error Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'delivery',
            isLoggedIn: true,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Dine In - Authenticated - Mobile Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'dinein',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['tableIdentifier', 'mobileNumber'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Mandatory Errors', 'mobile');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});
