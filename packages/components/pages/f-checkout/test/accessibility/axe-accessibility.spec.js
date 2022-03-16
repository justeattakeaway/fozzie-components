import forEach from 'mocha-each';
import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('Accessibility tests', () => {
    beforeEach(() => {
        checkout = new Checkout();
    });

    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        // Arrange
        const args = argumentStringBuilder();
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        const axeResults = getAxeResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        // Arrange
        const args = argumentStringBuilder({ serviceType: 'collection' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        const axeResults = getAxeResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        // Arrange
        const args = argumentStringBuilder({ isLoggedIn: false });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        const axeResults = getAxeResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', () => {
        // Arrange
        const args = argumentStringBuilder({ serviceType: 'invalid-url', isLoggedIn: false });
        checkout.withQuery('args', args);
        // Act
        checkout.loadError();
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
        // Arrange
        const args = argumentStringBuilder({ serviceType, patchCheckoutError });
        checkout.withQuery('args', args);
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
        const args = argumentStringBuilder({ serviceType, placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);
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
    .it('a11y - Guest - Collection - should have a correct tab order in patch checkout error - "%s"', patchCheckoutError => {
        // Arrange
        const args = argumentStringBuilder({ serviceType: 'collection', isLoggedIn: false, patchCheckoutError });
        checkout.withQuery('args', args);

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
    .it('a11y - Guest - Delivery - should have a correct tab order in patch checkout error - "%s"', patchCheckoutError => {
        // Arrange
        const args = argumentStringBuilder({ isLoggedIn: false, patchCheckoutError });
        checkout.withQuery('args', args);

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
    .it('a11y - Guest - Dine In - should have a correct tab order in patch checkout error - "%s"', patchCheckoutError => {
        // Arrange
        const args = argumentStringBuilder({ serviceType: 'dinein', isLoggedIn: false, patchCheckoutError });
        checkout.withQuery('args', args);

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
        const args = argumentStringBuilder({ serviceType: 'collection', isLoggedIn: false, placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

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
        const args = argumentStringBuilder({ isLoggedIn: false, placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

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
        const args = argumentStringBuilder({ serviceType: 'dinein', isLoggedIn: false, placeOrderError: 'duplicate' });
        checkout.withQuery('args', args);

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
