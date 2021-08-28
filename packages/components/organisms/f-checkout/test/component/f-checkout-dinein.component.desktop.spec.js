const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout = new Checkout();

describe('f-checkout "dinein" component tests', () => {
    beforeEach(() => {
        checkout.load({
            'Service Type': 'dinein',
            'Is User Logged In': true,
        });
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
