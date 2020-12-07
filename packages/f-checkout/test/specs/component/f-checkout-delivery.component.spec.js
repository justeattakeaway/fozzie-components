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

    forEach(['mobileNumber'])
    .it('should display the mandatory fields', field => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed(field)).toBe(true);
    });
});
