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

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages.', async () => {
        // Act
        await checkout.clearBlurField('mobileNumber');
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'mobile');
    });

    it('should display the "Something went wrong" error.', async () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'SERVER'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', async () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', async () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'additional-items-required'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Additional Items Required" Error Modal', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await checkout.clearBlurField('mobileNumber');
        await checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Act
        await checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
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

    it('should display the pre-order warning.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'mobile');
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

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        ['addressLine1', 'addressLocality', 'mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'mobile');
    });

    it('should display the illegal postcode error message', async () => {
        // Arrange
        const addressPostcode = 'TEST1A';

        // Act
        await checkout.clearBlurField('addressPostcode');
        await checkout.setFieldValue('addressPostcode', addressPostcode);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await checkout.clearBlurField('mobileNumber');
        await checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the two notes fields if there is two noteTypes.', async () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State - Two Notes Inputs', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Act
        await checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', async () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', async () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'additional-items-required'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Additional Items Required" Error Modal', 'mobile');
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

    it('should display the pre-order warning.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'mobile');
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

    it('should display the component base state.', async () => {
        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages', async () => {
        // Act
        ['tableIdentifier', 'mobileNumber'].forEach(field => checkout.clearBlurField(field));
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'mobile');
    });

    it('should display the illegal mobile number error message', async () => {
        // Act
        await checkout.clearBlurField('mobileNumber');
        await checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        await checkout.goToPayment();

        // Assert
        await browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});
