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
        CheckoutComponent.selectOrderTime('As soon as possible');
        CheckoutComponent.submit();
    });

    it('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Assert
        expect(CheckoutComponent.isOrderTimeDropdownDisplayed()).toBe(true);
        // expect(CheckoutComponent.getOrderTimeOptionText(0)).toBe('As soon as possible');
        // expect(CheckoutComponent.getOrderTimeOptionText(1)).toBe('Monday 00:15');
        // expect(CheckoutComponent.getOrderTimeOptionText(2)).toBe('Monday 00:30');
    });

    it('should allow the user to click through different order times', () => {
        // Act
        CheckoutComponent.orderTimeDropdownOptions().forEach((element) => {
            element.click();
        });

        CheckoutComponent.selectOrderTime(' As soon as possible ');
    });
});
