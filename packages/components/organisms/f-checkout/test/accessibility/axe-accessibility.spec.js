import forEach from 'mocha-each';

const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

describe('Accessibility tests', () => {
    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': true,
        });
        const axeResults = getAccessibilityTestResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': true,
        });
        const axeResults = getAccessibilityTestResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': false,
        });
        const axeResults = getAccessibilityTestResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', () => {
        checkout.loadError({
            'Service Type': 'Invalid URL',
            'Is User Logged In': false,
        });
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
        // Act
        checkout.load({
            'Service Type': serviceType,
            'Is User Logged In': true,
            'Patch Checkout Errors': patchError,
        });
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
        // Act
        checkout.load({
            'Service Type': serviceType,
            'Is User Logged In': true,
            'Place Order Errors': 'duplicate',
        });
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['collection', 'restaurant-not-taking-orders'],
        ['collection', 'additional-items-required'],
        ['collection', 'time-unavailable']
    ])
    .it('a11y - Guest - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        checkout.load({
            'Service Type': serviceType,
            'Is User Logged In': false,
            'Patch Checkout Errors': patchError,
        });

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };
        checkout.populateGuestCollectionCheckoutForm(addressInfo);
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['delivery', 'restaurant-not-taking-orders'],
        ['delivery', 'additional-items-required'],
        ['delivery', 'time-unavailable']
    ])
    .it('a11y - Guest - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        checkout.load({
            'Service Type': serviceType,
            'Is User Logged In': false,
            'Patch Checkout Errors': patchError,
        });

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

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    forEach([
        ['dinein', 'restaurant-not-taking-orders'],
        ['dinein', 'additional-items-required'],
        ['dinein', 'time-unavailable']
    ])
    .it('a11y - Guest - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchError) => {
        checkout.load({
            'Service Type': serviceType,
            'Is User Logged In': false,
            'Patch Checkout Errors': patchError,
        });

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

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Collection - should have a correct tab order in duplicate order error', () => {
        checkout.load({
            'Service Type': 'collection',
            'Is User Logged In': false,
            'Place Order Errors': 'duplicate',
        });

        // Act
        checkout.setFieldValue('firstName', 'Jerry');
        checkout.setFieldValue('lastName', 'Jazzman');
        const addressInfo = {
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };
        checkout.populateGuestCollectionCheckoutForm(addressInfo);
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Delivery - should have a correct tab order in duplicate order error', () => {
        checkout.load({
            'Service Type': 'delivery',
            'Is User Logged In': false,
            'Place Order Errors': 'duplicate',
        });

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

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Dine In - should have a correct tab order in duplicate order error', () => {
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': false,
            'Place Order Errors': 'duplicate',
        });

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

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });
});
