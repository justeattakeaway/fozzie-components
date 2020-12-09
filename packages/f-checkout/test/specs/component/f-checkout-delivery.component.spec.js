import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "delivery" component tests', () => {
    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
    .it('each fields error message should be displayed', field => {
        // Act
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it('address fields should exist', field => {
        // Assert
        expect(CheckoutComponent.doesInputFieldExist(field)).toBe(true);
    });

    it('should display the mandatory fields', () => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
    });

    it('should display an error message when a number format is incorrectly entered', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+4512345678911'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressDetails);
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });
});
