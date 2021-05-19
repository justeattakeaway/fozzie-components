import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "dinein" component tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'dinein',
            isAuthenticated: true,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should enable a user to submit a table identifier with correct characters', () => {
        // Arrange
        const customerInfo = {
            tableIdentifier: '22'
        };

        // Act
        checkout.populateDineInCheckoutForm(customerInfo);
        checkout.goToPayment();

        // Assert
        expect(checkout.isTableIdentifierMaxLengthErrorDisplayed()).toBe(false);
    });

    it('should display an error if the table identifier is longer than 12 characters', () => {
        // Arrange
        const customerInfo = {
            tableIdentifier: 'Longer than 12 characters'
        };

        // Act
        checkout.populateDineInCheckoutForm(customerInfo);

        // Assert
        expect(checkout.isTableIdentifierMaxLengthErrorDisplayed()).toBe(true);
    });
});
