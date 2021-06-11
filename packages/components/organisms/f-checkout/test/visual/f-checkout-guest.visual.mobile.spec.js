const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

describe('f-checkout - Collection - Guest - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', false)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the component base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Base State', 'mobile');
    });

    it('should display the mandatory error messages', () => {
        // Act
        checkout.clearCheckoutForm('mobileNumber');
        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Mandatory Errors State', 'mobile');
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
        browser.percyScreenshot('f-checkout - Collection - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout.withQuery('&knob-Place Order Errors', 'SERVER');
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        checkout.open(pageUrl);
        checkout.waitForComponent();
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
        browser.percyScreenshot('f-checkout - Collection - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Collection - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', false)
                .withQuery('&knob-Is ASAP available', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Collection - Guest - Pre-Order Warning', 'mobile');
    });
});


describe('f-checkout - Delivery - Guest - Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', false)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the delivery f-checkout component guest base state.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Base State', 'mobile');
    });

    it('should display the delivery f-checkout guest mandatory error messages', () => {
        // Act
        ['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode']
            .forEach(field => checkout.clearCheckoutForm(field));

        checkout.goToPayment();

        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Mandatory Errors State', 'mobile');
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
        browser.percyScreenshot('f-checkout - Delivery - Guest - Illegal Mobile Number Error State', 'mobile');
    });

    it('should display the "Duplicate Order Warning" modal', () => {
        // Arrange
        checkout.withQuery('&knob-Place Order Errors', 'SERVER');
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        checkout.open(pageUrl);
        checkout.waitForComponent();
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
        browser.percyScreenshot('f-checkout - Delivery - Guest - "Duplicate Order Warning" Modal', 'mobile');
    });
});

describe('f-checkout - Delivery - Guest - isAsapAvailable: false Mobile Visual Tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', false)
                .withQuery('&knob-Is ASAP available', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
    });

    it('should display the pre-order warning.', () => {
        // Assert
        browser.percyScreenshot('f-checkout - Delivery - Guest - Pre-Order Warning', 'mobile');
    });
});
