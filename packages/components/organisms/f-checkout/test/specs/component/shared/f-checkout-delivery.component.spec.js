import forEach from 'mocha-each';

const Checkout = require('../../../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "delivery" component tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    forEach(['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode'])
    .it('should display each fields error message', field => {
        // Act
        checkout.clearCheckoutForm(field);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it('should check if address fields exist', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(true);
    });

    it('should display the mandatory fields', () => {
        // Assert
        expect(checkout.isFieldDisplayed('mobileNumber')).toBe(true);
    });

    it('should prevent user from submitting a postcode with an illegal postcode', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(true);
    });

    it('should enable a user to submit a postcode with correct characters', () => {
        // Arrange
        const addressInfo = {
            postcode: 'AR51 1AA'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Assert
        expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
    });
});
