const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "dinein" component tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        // Act
        checkout.load({
            serviceType: 'dinein',
            isLoggedIn: true,
            isAsapAvailable: true,
            locale: 'en-GB'
        });
    });

    it('should prevent a user from entering more than 12 characters in the tableIdentifier field', async () => {
        // Arrange
        const maxlength = 12;
        const tableEntry = await 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        await checkout.setFieldValue('tableIdentifier', tableEntry);

        // Assert
        await expect((await checkout.getFieldValue('tableIdentifier')).length).toEqual(maxlength);
    });
});
