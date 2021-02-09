import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout component tests', () => {
    before(() => {
        browser.url('iframe.html?id=components-organisms--checkout-component&knob-Get%20Checkout%20Url=%2Fcheckout-delivery.json&knob-Available%20Fulfilment%20Url=%2Fcheckout-available-fulfilment.json&knob-Create%20Guest%20Url=%2Fcreate-guest.json&knob-Get%20Basket%20Url=%2Fget-basket-delivery.json&knob-Auth%20token=&knob-Login%20Url=%2Flogin&viewMode=story');
        CheckoutComponent.waitForCheckoutComponent();
    });

    it('should display the guest checkout header component', () => {
        // Assert
        expect(CheckoutComponent.isGuestCheckoutHeaderDisplayed()).toBe(true);
    });

    it('should display the guest checkout login button', () => {
        // Assert
        expect(CheckoutComponent.isGuestCheckoutLoginButtonDisplayed()).toBe(true);
    });

    forEach(['firstName', 'lastName', 'emailAddress'])
    .it('should show the guest checkout fields', field => {
        // Assert
        expect(CheckoutComponent.doesFieldExist(field)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'emailAddress'])
    .it('should display each fields error message', field => {
        // Act
        CheckoutComponent.clearCheckoutForm(field);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
    });

    it('should prevent user from submitting an invalid email address', () => {
        // Arrange
        const emailAddress = {
            emailAddress: 'abc@abc'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(emailAddress);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('emailAddress')).toBe(true);
    });


    it('should navigate to correct url when the login link is clicked', () => {
        // Arrange
        const loginPath = '/login';

        // Act
        CheckoutComponent.clickGuestCheckoutLogin();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });
});
