import forEach from 'mocha-each';
const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();

describe('f-checkout "collection" component tests', () => {
    before(() => {
        checkout.open('collection');
        checkout.waitForComponent();
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it('should check that address fields should not exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });
});
