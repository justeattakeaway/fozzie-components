import forEach from 'mocha-each';

const Checkout = require('../../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "collection" component tests - @browserstack', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: true,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it('should check that address fields should not exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });
});
