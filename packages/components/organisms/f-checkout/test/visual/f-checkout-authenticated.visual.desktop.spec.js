const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Collection - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages.', () => {
        // Act
        checkout.clearCheckoutForm('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'desktop');
    });

    it('should display the "Something went wrong" error.', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Checkout Errors', 'SERVER')
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'desktop');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Checkout Errors', 'ISSUES')
                .withQuery('&knob-Place Order Errors', 'SERVER');

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
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
        checkout.populateCollectionCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Place Order Errors', 'SERVER');

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', field => {
        // Act

        ['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode']
            .forEach(field => checkout.clearCheckoutForm(field));

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
        checkout.populateCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Place Order Errors', 'SERVER');

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'desktop');
    });
});

describe('f-checkout - Dine In - Authenticated - Desktop Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'dinein')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'desktop');
    });

    it('should display the mandatory error messages', field => {
        // Act

        ['mobileNumber', 'tableIdentifier']
            .forEach(field => checkout.clearCheckoutForm(field));

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
        checkout.populateDineInCheckoutForm(mobileNumberInfo);
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'desktop');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'dinein')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Place Order Errors', 'SERVER');

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'desktop');
    });
});
