import forEach from 'mocha-each';

const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('Accessibility tests', () => {
    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        // Act
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', true);

        checkout.load();
        const axeResults = getAccessibilityTestResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        // Act
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'collection')
            .withQuery('&knob-Is User Logged In', true);

        checkout.load();
        const axeResults = getAccessibilityTestResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        // Act
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', false);

        checkout.load();
        const axeResults = getAccessibilityTestResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', () => {
        // Act
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'Invalid URL')
            .withQuery('&knob-Is User Logged In', false);

        checkout.load('error');
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

        // Assert
        const result = checkout.getCheckoutErrorTabOrder();
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

        // Assert
        const result = checkout.getPlaceOrderErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['collection', 'restaurant-not-taking-orders'],
        ['collection', 'additional-items-required'],
        ['collection', 'time-unavailable']
    ])
    .it('a11y - Guest - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', serviceType)
            .withQuery('&knob-Is User Logged In', false)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        checkout.load();

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };
        checkout.populateGuestCollectionCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        const result = checkout.getCheckoutErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['delivery', 'restaurant-not-taking-orders'],
        ['delivery', 'additional-items-required'],
        ['delivery', 'time-unavailable']
    ])
    .it('a11y - Guest - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', serviceType)
            .withQuery('&knob-Is User Logged In', false)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        checkout.load();

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            line1: '1 Bristol Road',
            locality: 'Bristol',
            postcode: 'BS1 1AA'
        };
        checkout.populateGuestCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        const result = checkout.getCheckoutErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['dinein', 'restaurant-not-taking-orders'],
        ['dinein', 'additional-items-required'],
        ['dinein', 'time-unavailable']
    ])
    .it('a11y - Guest - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', serviceType)
            .withQuery('&knob-Is User Logged In', false)
            .withQuery('&knob-Patch Checkout Errors', patchError);

        checkout.load();

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };
        checkout.populateGuestDineInCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        const result = checkout.getCheckoutErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Collection - should have a correct tab order in duplicate order error', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'collection')
            .withQuery('&knob-Is User Logged In', false)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        checkout.load();

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };
        checkout.populateGuestCollectionCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        const result = checkout.getPlaceOrderErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Delivery - should have a correct tab order in duplicate order error', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'delivery')
            .withQuery('&knob-Is User Logged In', false)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        checkout.load();

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            line1: '1 Bristol Road',
            locality: 'Bristol',
            postcode: 'BS1 1AA'
        };
        checkout.populateGuestCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        const result = checkout.getPlaceOrderErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Dine In - should have a correct tab order in duplicate order error', () => {
        // Arrange
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'dinein')
            .withQuery('&knob-Is User Logged In', false)
            .withQuery('&knob-Place Order Errors', 'duplicate');

        checkout.load();

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };
        checkout.populateGuestDineInCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        const result = checkout.getPlaceOrderErrorTabOrder();
        expect(result.actual).toEqual(result.expected);
    });
});
