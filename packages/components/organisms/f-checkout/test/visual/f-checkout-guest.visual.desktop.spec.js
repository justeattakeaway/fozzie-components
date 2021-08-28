const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

describe('f-checkout - Collection - Guest - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': false,
            'Is ASAP available': true
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const mobileNumberInfo = {
            mobileNumber: '123'
        };

        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.populateCollectionCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout.load({
            'Place Order Errors': 'duplicate'
        });
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        checkout.setFieldValue('emailAddress', 'jerry.jazzman@ronniescotts.co.uk');
        checkout.setFieldValue('mobileNumber', '07234567890');

        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display invalid email address', () => {
        // Act
        checkout.clearBlurField('emailAddress');
        checkout.setFieldValue('emailAddress', '@jazz.man@tunetown.com');
        browser.keys('Tab');

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - invalid email address Error State', 'desktop');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': false,
            'Is ASAP available': false
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Guest - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': false,
            'Is ASAP available': true
        });
    });

    it('should display the delivery f-checkout component guest base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'desktop');
    });

    it('should display the delivery f-checkout guest mandatory error messages', () => {
        // Act
        ['addressLine1', 'addressLocality'].forEach(field => checkout.clearCheckoutForm(field));
        ['mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const mobileNumberInfo = {
            mobileNumber: '123'
        };

        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.populateCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout.load({
            'Place Order Errors': 'duplicate'
        });
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '07234567890',
            line1: '47 Frith  Street',
            locality: 'London',
            postcode: 'W1D 4HT'
        };
        checkout.populateGuestCheckoutForm(addressInfo);

        // Act
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display invalid email address', () => {
        // Act
        checkout.clearBlurField('emailAddress');
        checkout.setFieldValue('emailAddress', '@jazz.man@tunetown.com');
        browser.keys('Tab');

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - invalid email address Error State', 'desktop');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': false,
            'Is ASAP available': false
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Guest - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': false,
            'Is ASAP available': false
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearCheckoutForm('tableIdentifier');
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Manadatory Errors', 'desktop');
    });

    it('should display the illegal mobile number error message', () => {
        // Arrange
        const mobileNumberInfo = {
            mobileNumber: '123'
        };

        // Act
        checkout.clearBlurField('mobileNumber');
        checkout.populateDineInCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Guest - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': false,
            'Is ASAP available': false,
            'Place Order Errors': 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Guest - "Duplicate Order Warning" Modal', 'desktop');
    });
});
