import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

const illegalMobileNumber = '123';

describe('f-checkout - Collection - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', patchCheckoutError: 'SERVER' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();
        browser.pause(500);

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'desktop');
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'desktop');
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
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'collection', isAsapAvailable: false });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - Desktop Visual Tests', () => {
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
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Authenticated - Desktop Visual Tests', () => {
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
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ serviceType: 'dinein', placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });

    it('should display the two notes fields if there is two noteTypes.', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('args', 'serviceType:collection;isLoggedIn:true;isAsapAvailable:true;noteType:get-notes-config-split;locale:en-GB');

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State - Two Notes Inputs', 'desktop');
    });
});

describe('f-checkout - Delivery - AU Tenant - visibile state field - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ isAsapAvailable: false, locale: 'en-AU' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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

        const args = argumentStringBuilder({ getBasketError: 'age-restriction', locale: 'en-AU' });
        checkout.withQuery('args', args);

        // Act
        checkout.loadAgeVerification();
    });

    it('should display the age verification page', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Visible Age Verification', 'desktop');
    });
});
