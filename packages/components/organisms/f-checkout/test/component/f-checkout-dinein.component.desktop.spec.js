const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "dinein" component tests', () => {
    beforeEach(() => {
        checkout = new Checkout();
        checkout.withQuery('&knob-Service Type', 'dinein')
            .withQuery('&knob-Is User Logged In', true);

        checkout.load();
    });

    it('should prevent a user from entering more than 12 characters in the tableIdentifier field', () => {
        // Arrange
        const maxlength = 12;

        checkout.clearCheckoutForm('tableIdentifier');
        const tableEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        checkout.setFieldValue('tableIdentifier', tableEntry);

        // Assert
        expect(checkout.getFieldValue('tableIdentifier').length).toEqual(maxlength);
    });
});
