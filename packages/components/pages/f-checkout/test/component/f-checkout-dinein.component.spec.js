import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "dinein" component tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();
        const args = argumentStringBuilder({ serviceType: 'dinein', isLoggedIn: false });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
    });

    it('should prevent a user from entering more than 12 characters in the tableIdentifier field', () => {
        // Arrange
        const maxlength = 12;
        const tableEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        checkout.setFieldValue('tableIdentifier', tableEntry);

        // Assert
        expect(checkout.getFieldValue('tableIdentifier').length).toEqual(maxlength);
    });
});
