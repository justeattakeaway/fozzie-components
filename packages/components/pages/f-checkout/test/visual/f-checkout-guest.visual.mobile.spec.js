const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();
let checkoutInfo;

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Guest - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false,
            isASAP: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'mobile');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false,
            isASAP: true,
            orderError: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderError);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false,
            isASAP: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', 'mobile');
    });
});


describe('f-checkout - Delivery - Guest - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false,
            isASAP: true
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the delivery f-checkout component guest base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'mobile');
    });

    it('should display the delivery f-checkout guest mandatory error messages', () => {
        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'mobile');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false,
            isASAP: true,
            orderError: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.orderError);
        checkout.load();

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
        checkout.setFieldValues();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false,
            isASAP: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Dine In - Guest - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: false,
            isASAP: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP);

        // Act
        checkout.load();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearBlurField('tableIdentifier');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Manadatory Errors', 'mobile');
    });

    it('should display the illegal mobile number error message', () => {
        // Act
        checkout.setFieldValue('mobileNumber', illegalMobileNumber);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: false,
            isASAP: false,
            placeCheckoutOrders: 'duplicate'
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Is ASAP available', checkoutInfo.isASAP)
            .withQuery('&knob-Place Order Errors', checkoutInfo.placeCheckoutOrders);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            tableIdentifier: '10'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});
