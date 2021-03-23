const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();
import forEach from 'mocha-each';

describe('f-checkout "invalid" component tests', () => {
    before(() => {
        const checkoutData = {
            type: '',
            isAuthenticated: false,
            isValid: false
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it.only('should check that address fields should not exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });
});
