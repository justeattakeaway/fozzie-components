import forEach from 'mocha-each';

const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;
let checkoutInfo;

describe('Accessibility tests', () => {
    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', true);

        // Act
        checkout.load();
        const axeResults = getAccessibilityTestResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'collection')
            .withQuery('&knob-Is User Logged In', true);

        // Act
        checkout.load();
        const axeResults = getAccessibilityTestResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', false);

        // Act
        checkout.load();
        const axeResults = getAccessibilityTestResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'Invalid URL')
            .withQuery('&knob-Is User Logged In', false);

        // Act
        checkout.loadError();
        const axeResults = getAccessibilityTestResults('f-checkout-error-page');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['collection', 'restaurant-not-taking-orders'],
        ['collection', 'additional-items-required'],
        ['collection', 'time-unavailable'],
        ['delivery', 'restaurant-not-taking-orders'],
        ['delivery', 'additional-items-required'],
        ['delivery', 'time-unavailable'],
        ['dinein', 'restaurant-not-taking-orders'],
        ['dinein', 'additional-items-required'],
        ['dinein', 'time-unavailable']
    ])
    .it('a11y - Authenticated - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', serviceType)
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        // Act
        checkout.load();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['collection'],
        ['delivery']
    ])
    .it('a11y - Authenticated - "%s" - should have a correct tab order in duplicate order error', serviceType => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', serviceType)
            .withQuery('&knob-Is User Logged In', true)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        // Act
        checkout.load();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['restaurant-not-taking-orders'],
        ['additional-items-required'],
        ['time-unavailable']
    ])
    .it('a11y - Guest - Collection - should have a correct tab order in patch checkout error - "%s"', (patchError) => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['restaurant-not-taking-orders'],
        ['additional-items-required'],
        ['time-unavailable']
    ])
    .it('a11y - Guest - Delivery - should have a correct tab order in patch checkout error - "%s"', (patchError) => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            addressLine1: '1 Bristol Road',
            addressLocality: 'Bristol',
            addressPostcode: 'BS1 1AA'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['restaurant-not-taking-orders'],
        ['additional-items-required'],
        ['time-unavailable']
    ])
    .it('a11y - Guest - Dine In - should have a correct tab order in patch checkout error - "%s"', (patchError) => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Collection - should have a correct tab order in duplicate order error', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'collection',
            isAuthenticated: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Delivery - should have a correct tab order in duplicate order error', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'delivery',
            isAuthenticated: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            addressLine1: '1 Bristol Road',
            addressLocality: 'Bristol',
            addressPostcode: 'BS1 1AA'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Dine In - should have a correct tab order in duplicate order error', () => {
        // Arrange
        checkout = new Checkout();
        checkoutInfo = {
            serviceType: 'dinein',
            isAuthenticated: false
        };
        checkout.withQuery('&knob-Service Type', checkoutInfo.serviceType)
            .withQuery('&knob-Is User Logged In', checkoutInfo.isAuthenticated)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load();
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });
});
