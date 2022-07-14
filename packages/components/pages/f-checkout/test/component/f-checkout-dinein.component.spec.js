import Checkout from '../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "dinein" component tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
            serviceType: 'dinein',
            isLoggedIn: true,
            isAsapAvailable: true,
            locale: 'en-GB'
        });
    });

    it('should prevent a user from entering more than 12 characters in the tableIdentifier field', async () => {
        // Arrange
        const maxlength = 12;
        const tableEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        await Checkout.setFieldValue('tableIdentifier', tableEntry);

        // Assert
        await expect((await Checkout.getFieldValue('tableIdentifier')).length).toEqual(maxlength);
    });
});
