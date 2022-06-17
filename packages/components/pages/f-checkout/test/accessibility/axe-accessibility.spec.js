import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('Accessibility tests', () => {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    beforeEach(() => {
        checkout = new Checkout();
    });

    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        // Act
        checkout.load({
            ...checkoutInfo
        });
        const axeResults = getAxeResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'collection'
        });
        const axeResults = getAxeResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            isLoggedIn: false
        });
        const axeResults = getAxeResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', () => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'invalid-url',
            isLoggedIn: false
        });
        const axeResults = getAxeResults('f-checkout-error-page');

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
    .it('a11y - Authenticated - "%s" - should have a correct tab order in patch checkout error - "%s"', (serviceType, patchCheckoutError) => {
        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType,
            patchCheckoutError
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
            ...checkoutInfo,
            serviceType,
            placeOrderError: 'duplicate'
        });
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
    .it('a11y - Guest - Collection - should have a correct tab order in patch checkout error - "%s"', patchCheckoutError => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'collection',
            isLoggedIn: false,
            patchCheckoutError
        });
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
    .it('a11y - Guest - Delivery - should have a correct tab order in patch checkout error - "%s"', patchCheckoutError => {
        // Arrange
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
        checkout.load({
            ...checkoutInfo,
            isLoggedIn: false,
            patchCheckoutError
        });
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
    .it('a11y - Guest - Dine In - should have a correct tab order in patch checkout error - "%s"', patchCheckoutError => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'dinein',
            isLoggedIn: false,
            patchCheckoutError
        });
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Collection - should have a correct tab order in duplicate order error', () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'collection',
            isLoggedIn: false,
            placeOrderError: 'duplicate'
        });
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Delivery - should have a correct tab order in duplicate order error', () => {
        // Arrange
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
        checkout.load({
            ...checkoutInfo,
            isLoggedIn: false,
            placeOrderError: 'duplicate'
        });
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Dine In - should have a correct tab order in duplicate order error', () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };

        checkout.inputFieldValues = customerInfo;

        // Act
        checkout.load({
            ...checkoutInfo,
            serviceType: 'dinein',
            isLoggedIn: false,
            placeOrderError: 'duplicate'
        });
        checkout.setFieldValues();
        checkout.goToPayment();

        const expectedTabOrder = [checkout.errorMessageRetry, checkout.errorMessageDupOrderGoToHistory, checkout.closeMessageModal];
        const result = checkout.testTabOrder(expectedTabOrder);

        // Assert
        expect(result.actual).toEqual(result.expected);
    });
});
