const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout - Collection - Authenticated - Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Base State', 'shared');
    });

    it('should display the mandatory error messages.', () => {
        // Act
        checkout.clearCheckoutForm('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Mandatory Errors State', 'shared');
    });

    it('should display the "Something went wrong" error.', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Patch Checkout Errors', 'SERVER')
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Something went wrong" Error', 'shared');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Patch Checkout Errors', 'restaurant-not-taking-orders')

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Restaurant not taking orders" Error Modal', 'shared');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Patch Checkout Errors', 'additional-items-required')

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Additional Items Required" Error Modal', 'shared');
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Illegal Mobile Number Error State', 'shared');
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - "Duplicate Order Warning" Modal', 'shared');
    });
});

describe('f-checkout - Collection - Authenticated - isAsapAvailable: false Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Collection - Authenticated - Pre-Order Warning', 'shared');
    });
});

describe('f-checkout - Delivery - Authenticated - Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Base State', 'shared');
    });

    it('should display the mandatory error messages', field => {
        // Act

        ['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode']
            .forEach(field => checkout.clearCheckoutForm(field));

        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Manadatory Errors', 'shared');
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Postcode Error State', 'shared');
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Illegal Mobile Number Error State', 'shared');
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Duplicate Order Warning" Modal', 'shared');
    });

    it('should display the "Restaurant not taking orders" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Patch Checkout Errors', 'restaurant-not-taking-orders')

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Restaurant not taking orders" Error Modal', 'shared');
    });

    it('should display the "Additional Items Required" modal', () => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true)
                .withQuery('&knob-Patch Checkout Errors', 'additional-items-required')

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - "Additional Items Required" Error Modal', 'shared');
    });
});

describe('f-checkout - Delivery - Authenticated - isAsapAvailable: false Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Delivery - Authenticated - Pre-Order Warning', 'shared');
    });
});

describe('f-checkout - Dine In - Authenticated - Visual Tests', () => {
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
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - Base State', 'shared');
    });

    it('should display the mandatory error messages', field => {
        // Act

        ['mobileNumber', 'tableIdentifier']
            .forEach(field => checkout.clearCheckoutForm(field));

        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Manadatory Errors', 'shared');
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
        browser.percyScreenshot('f-checkout - Dine In - Authenticated - Illegal Mobile Number Error State', 'shared');
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
        browser.percyScreenshot('f-checkout - Dine in - Authenticated - "Duplicate Order Warning" Modal', 'shared');
    });
});
