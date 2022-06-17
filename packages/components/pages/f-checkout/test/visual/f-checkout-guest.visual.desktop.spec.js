const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Guest - Desktop Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'collection',
        isLoggedIn: false,
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
        browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            isAsapAvailable: true,
            placeOrderError: 'duplicate'
        });

        checkout.setFieldValues();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display invalid email address', () => {
        // Arrange
        const emailAddress = '@jazz.man@tunetown.com';

        // Act
        checkout.setFieldValue('emailAddress', emailAddress);
        browser.keys('Tab');

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - invalid email address Error State', 'desktop');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'collection',
            isLoggedIn: false,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Guest - Desktop Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: false,
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

    it('should display the delivery f-checkout component guest base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'desktop');
    });

    it('should display the delivery f-checkout guest mandatory error messages', () => {
        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            addressLine1: '47 Frith  Street',
            addressLocality: 'London',
            addressPostcode: 'W1D 4HT'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.setFieldValues();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display invalid email address', () => {
        // Arrange
        const emailAddress = '@jazz.man@tunetown.com';

        // Act
        checkout.setFieldValue('emailAddress', emailAddress);
        browser.keys('Tab');

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - invalid email address Error State', 'desktop');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'delivery',
            isLoggedIn: false,
            isAsapAvailable: false,
            locale: 'en-GB'
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Guest - Desktop Visual Tests', () => {
    const checkoutInfo = {
        serviceType: 'dinein',
        isLoggedIn: false,
        isAsapAvailable: false,
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
        browser.percyScreenshot('f-checkout - Dine in - Guest - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearBlurField('tableIdentifier');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Manadatory Errors', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            tableIdentifier: '10'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            placeOrderError: 'duplicate'
        });
        checkout.setFieldValues();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - "Duplicate Order Warning" Modal', 'desktop');
    });
});
