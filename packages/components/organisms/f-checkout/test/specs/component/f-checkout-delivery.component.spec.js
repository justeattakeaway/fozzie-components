import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "delivery" component tests', () => {
    before(() => {
        browser.url('iframe.html?id=components-organisms--checkout-component&knob-Get%20Checkout%20Url=%2Fcheckout-delivery.json&knob-Available%20Fulfilment%20Url=%2Fcheckout-available-fulfilment.json&knob-Create%20Guest%20Url=%2Fcreate-guest.json&knob-Get%20Basket%20Url=%2Fget-basket-delivery.json&knob-Auth%20token=a&knob-Login%20Url=%2Flogin&viewMode=story');
        CheckoutComponent.waitForCheckoutComponent();
    });

    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
    .it('should display each fields error message', field => {
        // Act
        CheckoutComponent.clearCheckoutForm(field);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it('should check if address fields exist', field => {
        // Assert
        expect(CheckoutComponent.doesFieldExist(field)).toBe(true);
    });

    it('should display the mandatory fields', () => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
    });

    it('should prevent user from submitting a postcode with an illegal postcode', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isPostCodeTypeErrorDisplayed()).toBe(true);
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
        expect(CheckoutComponent.isPostCodeTypeErrorDisplayed()).toBe(false);
    });
});
