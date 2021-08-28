const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

describe('f-checkout - Collection - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true,
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
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Patch Checkout Errors': 'SERVER',
            'Is ASAP available': true,
        });
        checkout.goToPayment();
        browser.pause(500);

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'desktop');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Patch Checkout Errors': 'restaurant-not-taking-orders',
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'desktop');
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Place Order Errors': 'duplicate',
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
            'Is ASAP available': false,
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        ['addressLine1', 'addressLocality'].forEach(field => checkout.clearCheckoutForm(field));
        ['mobileNumber', 'addressPostcode'].forEach(field => checkout.clearBlurField(field));
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'desktop');
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'desktop');
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Place Order Errors': 'duplicate',
        });
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
            'Is ASAP available': false,
        });
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Act
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': true,
            'Is ASAP available': true,
        });
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearCheckoutForm('tableIdentifier');
        checkout.clearBlurField('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'desktop');
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
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Act
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': true,
            'Is ASAP available': true,
            'Place Order Errors': 'duplicate',
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
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Is ASAP available', false)
            .withQuery('&knob-Locale', 'en-AU');

        // Act
        checkout.load();
    });

    it('should display the state input.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible State field', 'desktop');
    });
});
