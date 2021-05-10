import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "collection" component tests - @percy', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: true,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    // Refactor for Percy visual regression
    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it('should show that "%s" does not exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });
});
