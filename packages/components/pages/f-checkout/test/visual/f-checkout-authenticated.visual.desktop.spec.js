const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Authenticated - Desktop Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages.', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'desktop');
    });

    it('should display the "Something went wrong" error.', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'SERVER'
        });
        checkout.goToPayment();
        browser.pause(500);

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'desktop');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'restaurant-not-taking-orders'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'desktop');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            patchCheckoutError: 'additional-items-required'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Additional Items Required" Error Modal', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display the two notes fields if there is two noteTypes.', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            noteType: 'get-notes-config-split'
        });

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State - Two Notes Inputs', 'desktop');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - Desktop Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['addressLine1', 'addressLocality', 'mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'desktop');
    });

    it('should display the illegal postcode error message', () => {
        // Arrange
        const addressPostcode = 'TEST1A';

        // Act
        checkout.clearBlurField('addressPostcode');
        checkout.setFieldValue('addressPostcode', addressPostcode);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Authenticated - Desktop Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['tableIdentifier', 'mobileNumber'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Delivery - AU Tenant - visibile state field - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'delivery',
            isLoggedIn: true,
            isAsapAvailable: false,
            locale: 'en-AU'
        });
    });

    it('should display the state input.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible State field', 'desktop');
    });
});

describe('f-checkout - Delivery - AU Tenant - age verification page - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'delivery',
            isLoggedIn: true,
            isAsapAvailable: true,
            locale: 'en-AU',
            getBasketError: 'age-restriction'
        });
    });

    it('should display the age verification page', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible Age Verification', 'desktop');
    });
});
