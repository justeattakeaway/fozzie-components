import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
        CheckoutComponent.waitForCheckoutComponent();
    })

    it('should display the f-checkout component', () => {
        // Assert
        expect(CheckoutComponent.isCheckoutComponentDisplayed()).toBe(true);
    });

    it('should display the allergen link'), () => {
        // Assert
        expect(CheckoutComponent.isAllergenLinkDisplayed()).toBe(true);
    }

    // Skip until we have something to assert on
    it.skip('should submit the checkout form', () => {

        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
            postcode: 'AR51 1AA'
        }

        // Act
        CheckoutComponent.submitCheckoutForm(addressInfo);
        CheckoutComponent.inputUserNote('No mushrooms!');
        CheckoutComponent.selectDeliveryTime('As soon as possible');
        CheckoutComponent.submit();
    })
});
