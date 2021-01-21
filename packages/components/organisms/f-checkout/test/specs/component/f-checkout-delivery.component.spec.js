import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "delivery" component tests', () => {
    before(() => {
        browser.url('/iframe.html?id=components-organisms--checkout-component');
        CheckoutComponent.waitForCheckoutComponent();
    });

    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
    .it('each fields error message should be displayed', field => {
        // Act
        CheckoutComponent.clearCheckoutForm();
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it('address fields should exist', field => {
        // Assert
        expect(CheckoutComponent.doesFieldExist(field)).toBe(true);
    });

    it('should display the mandatory fields', () => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
    });

    it('should prevent user from submitting a postcode with illegal characters', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldTypeErrorDisplayed('addressPostcode')).toBe(true);
    });

    it('should enable a user to submit a postcode with correct characters', () => {
        // Arrange
        const addressInfo = {
            postcode: 'AR51 1AA'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldTypeErrorDisplayed('addressPostcode')).toBe(false);
    });
});
