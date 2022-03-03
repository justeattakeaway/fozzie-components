import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', patchCheckoutError: 'SERVER' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', patchCheckoutError: 'restaurant-not-taking-orders' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', patchCheckoutError: 'additional-items-required' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ isAsapAvailable: false });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Delivery - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder();
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'mobile');
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

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ patchCheckoutError: 'restaurant-not-taking-orders' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Restaurant not taking orders" Error Modal', 'mobile');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ patchCheckoutError: 'additional-items-required' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Additional Items Required" Error Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ isAsapAvailable: false });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'mobile');
    });
});

describe('f-checkout - Dine In - Authenticated - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'dinein' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'mobile');
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

        const args = argumentStringBuilder({ serviceType: 'dinein', placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'mobile');
    });
});
