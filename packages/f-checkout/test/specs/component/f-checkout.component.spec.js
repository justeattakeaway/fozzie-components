import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout component tests', () => {
    it('should display the f-checkout component', () => {
        // Assert
        expect(CheckoutComponent.isCheckoutComponentDisplayed()).toBe(true);
    });

    it('should display the allergen link', () => {
        // Assert
        expect(CheckoutComponent.isAllergenLinkDisplayed()).toBe(true);
    });

    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
                .it('each fields error message should be displayed', field => {
                    // Act
                    CheckoutComponent.submit();

                    // Assert
                    expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
                });

    forEach(['mobileNumber', 'addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
        .it('should display all fields', field => {
        // Assert
            expect(CheckoutComponent.isFieldDisplayed(field)).toBe(true);
        });

    it.skip('should submit the checkout form', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
            postcode: 'AR51 1AA'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.inputUserNote('No mushrooms!');
        CheckoutComponent.selectFulfillmentTime('As soon as possible');
        CheckoutComponent.submit();
    });
});
