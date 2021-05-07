import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "delivery" component tests - @percy', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    // Refactor for Percy visual regression
    forEach(['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode'])
    .it('should display the error message for "%s"', field => {
        // Act
        checkout.clearCheckoutForm(field);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed(field)).toBe(true);
    });

    // Refactor for Percy visual regression
    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it('should show that address fields exist for "%s"', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(true);
    });

    // Refactor for Percy visual regression
    forEach(['mobileNumber', 'addressLine1', 'addressLocality', 'addressPostcode'])
    .it('should display the mandatory field, "%s"', field => {
        // Assert
        expect(checkout.isFieldDisplayed(field)).toBe(true);
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
