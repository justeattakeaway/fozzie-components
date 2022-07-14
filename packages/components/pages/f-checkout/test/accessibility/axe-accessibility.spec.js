import Checkout from '../../test-utils/component-objects/f-checkout.component';
import CheckoutError from '../../test-utils/component-objects/f-checkout-error.component';

let tests;

describe('Accessibility tests', () => {
    const checkoutInfo = {
        serviceType: 'delivery',
        isLoggedIn: true,
        isAsapAvailable: true,
        locale: 'en-GB'
    };

    it('a11y - should test f-checkout component (delivery) WCAG compliance', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo
        });
        const axeResults = await Checkout.getAxeResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            serviceType: 'collection'
        });
        const axeResults = await Checkout.getAxeResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', async () => {
        // Act
        await Checkout.load({
            ...checkoutInfo,
            isLoggedIn: false
        });
        const axeResults = await Checkout.getAxeResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', async () => {
        // Act
        await CheckoutError.load({
            ...checkoutInfo,
            serviceType: 'invalid-url',
            isLoggedIn: false
        });
        const axeResults = await CheckoutError.getAxeResults('f-checkout-error-page');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    tests = [
        { serviceType: 'collection', patchCheckoutError: 'restaurant-not-taking-orders' },
        { serviceType: 'collection', patchCheckoutError: 'additional-items-required' },
        { serviceType: 'collection', patchCheckoutError: 'time-unavailable' },
        { serviceType: 'delivery', patchCheckoutError: 'restaurant-not-taking-orders' },
        { serviceType: 'delivery', patchCheckoutError: 'additional-items-required' },
        { serviceType: 'delivery', patchCheckoutError: 'time-unavailable' },
        { serviceType: 'dinein', patchCheckoutError: 'restaurant-not-taking-orders' },
        { serviceType: 'dinein', patchCheckoutError: 'additional-items-required' },
        { serviceType: 'dinein', patchCheckoutError: 'time-unavailable' }
    ];

    tests.forEach(({ serviceType, patchCheckoutError }) => {
        it(`a11y - Authenticated - "${serviceType}" - should have a correct tab order in patch checkout error - "${patchCheckoutError}"`, async () => {
            // Act
            await Checkout.load({
                ...checkoutInfo,
                serviceType,
                patchCheckoutError
            });
            await Checkout.goToPayment();

            const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.closeMessageModal]);
            const result = Checkout.testTabOrder(expectedTabOrder);

            // Assert
            await expect(result.actual).toEqual(result.expected);
        });
    });

    tests = [
        'collection',
        'delivery'
    ];

    tests.forEach(serviceType => {
        it(`a11y - Authenticated - "${serviceType}" - should have a correct tab order in duplicate order error`, async () => {
            // Act
            await Checkout.load({
                ...checkoutInfo,
                serviceType,
                placeOrderError: 'duplicate'
            });
            await Checkout.goToPayment();

            const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.errorMessageDupOrderGoToHistory, Checkout.closeMessageModal]);
            const result = Checkout.testTabOrder(expectedTabOrder);

            // Assert
            await expect(result.actual).toEqual(result.expected);
        });
    });

    tests = [
        'restaurant-not-taking-orders',
        'additional-items-required',
        'time-unavailable'
    ];

    tests.forEach(patchCheckoutError => {
        it(`a11y - Guest - Collection - should have a correct tab order in patch checkout error - "${patchCheckoutError}"`, async () => {
            // Arrange
            const customerInfo = {
                firstName: 'Jerry',
                lastName: 'Jazzman',
                emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
                mobileNumber: '+447111111111'
            };

            Checkout.inputFieldValues = customerInfo;

            // Act
            await Checkout.load({
                ...checkoutInfo,
                serviceType: 'collection',
                isLoggedIn: false,
                patchCheckoutError
            });
            await Checkout.setFieldValues();
            await Checkout.goToPayment();

            const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.closeMessageModal]);
            const result = Checkout.testTabOrder(expectedTabOrder);

            // Assert
            await expect(result.actual).toEqual(result.expected);
        });

        it(`a11y - Guest - Delivery - should have a correct tab order in patch checkout error - "${patchCheckoutError}"`, async () => {
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

            Checkout.inputFieldValues = customerInfo;

            // Act
            await Checkout.load({
                ...checkoutInfo,
                isLoggedIn: false,
                patchCheckoutError
            });
            await Checkout.setFieldValues();
            await Checkout.goToPayment();

            const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.closeMessageModal]);
            const result = Checkout.testTabOrder(expectedTabOrder);

            // Assert
            await expect(result.actual).toEqual(result.expected);
        });

        it(`a11y - Guest - Dine In - should have a correct tab order in patch checkout error - "${patchCheckoutError}"`, async () => {
            // Arrange
            const customerInfo = {
                firstName: 'Jerry',
                lastName: 'Jazzman',
                emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
                mobileNumber: '+447111111111',
                tableIdentifier: '1'
            };

            Checkout.inputFieldValues = customerInfo;

            // Act
            await Checkout.load({
                ...checkoutInfo,
                serviceType: 'dinein',
                isLoggedIn: false,
                patchCheckoutError
            });
            await Checkout.setFieldValues();
            await Checkout.goToPayment();

            const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.closeMessageModal]);
            const result = Checkout.testTabOrder(expectedTabOrder);

            // Assert
            await expect(result.actual).toEqual(result.expected);
        });
    });

    it('a11y - Guest - Collection - should have a correct tab order in duplicate order error', async () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111'
        };

        Checkout.inputFieldValues = customerInfo;

        // Act
        await Checkout.load({
            ...checkoutInfo,
            serviceType: 'collection',
            isLoggedIn: false,
            placeOrderError: 'duplicate'
        });
        await Checkout.setFieldValues();
        await Checkout.goToPayment();

        const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.errorMessageDupOrderGoToHistory, Checkout.closeMessageModal]);
        const result = Checkout.testTabOrder(expectedTabOrder);

        // Assert
        await expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Delivery - should have a correct tab order in duplicate order error', async () => {
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

        Checkout.inputFieldValues = customerInfo;

        // Act
        await Checkout.load({
            ...checkoutInfo,
            isLoggedIn: false,
            placeOrderError: 'duplicate'
        });
        await Checkout.setFieldValues();
        await Checkout.goToPayment();

        const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.errorMessageDupOrderGoToHistory, Checkout.closeMessageModal]);
        const result = Checkout.testTabOrder(expectedTabOrder);

        // Assert
        await expect(result.actual).toEqual(result.expected);
    });

    it('a11y - Guest - Dine In - should have a correct tab order in duplicate order error', async () => {
        // Arrange
        const customerInfo = {
            firstName: 'Jerry',
            lastName: 'Jazzman',
            emailAddress: 'jerry.jazzman@ronniescotts.co.uk',
            mobileNumber: '+447111111111',
            tableIdentifier: '1'
        };

        Checkout.inputFieldValues = customerInfo;

        // Act
        await Checkout.load({
            ...checkoutInfo,
            serviceType: 'dinein',
            isLoggedIn: false,
            placeOrderError: 'duplicate'
        });
        await Checkout.setFieldValues();
        await Checkout.goToPayment();

        const expectedTabOrder = Promise.all([Checkout.errorMessageRetry, Checkout.errorMessageDupOrderGoToHistory, Checkout.closeMessageModal]);
        const result = Checkout.testTabOrder(expectedTabOrder);

        // Assert
        await expect(result.actual).toEqual(result.expected);
    });
});
