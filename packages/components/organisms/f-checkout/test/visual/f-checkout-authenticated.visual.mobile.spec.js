const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Collection - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true
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
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Patch Checkout Errors': 'SERVER',
            'Is ASAP available': true
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Patch Checkout Errors': 'restaurant-not-taking-orders'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Patch Checkout Errors': 'additional-items-required'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Additional Items Required" Error Modal', 'mobile');
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Place Order Errors': 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': false
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Delivery - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['addressLine1', 'addressLocality'].forEach(field => checkout.clearCheckoutForm(field));
        ['mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'mobile');
    });

    it('should display the illegal postcode error message', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        checkout.clearBlurField('addressPostcode');
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'mobile');
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Place Order Errors': 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Patch Checkout Errors': 'restaurant-not-taking-orders'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Patch Checkout Errors': 'additional-items-required'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Additional Items Required" Error Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': false
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Dine In - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': true,
            'Is ASAP available': true
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearCheckoutForm('tableIdentifier');
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'mobile');
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
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Place Order Errors': 'duplicate'
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});
