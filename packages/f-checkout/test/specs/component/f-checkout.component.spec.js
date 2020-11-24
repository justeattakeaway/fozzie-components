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

    forEach(Object.keys(CheckoutComponent.inputs)).it('should display all fields', key => {
        // Assert
        expect(CheckoutComponent.inputs[key]().isDisplayed()).toBe(true);
    });

    // Skip until we have something to assert on
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
        CheckoutComponent.submitCheckoutForm(addressInfo);
        CheckoutComponent.inputUserNote('No mushrooms!');
        CheckoutComponent.selectFulfillmentTime('As soon as possible');
        CheckoutComponent.submit();
    });
});
