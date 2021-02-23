import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout component tests', () => {
    beforeEach(() => {
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

    it('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Act
        CheckoutComponent.selectOrderTime('As soon as possible');

        // Assert
        expect(CheckoutComponent.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(CheckoutComponent.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(CheckoutComponent.getOrderTimeOptionText(1)).toBe('Wednesday 00:45');
        expect(CheckoutComponent.getOrderTimeOptionText(2)).toBe('Wednesday 01:00');
    });

    it('should display a "mobileNumber" error message when an unsupported country code is used in the mobile number field', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+8112345678911'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressDetails);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });

    it('should not display a "mobileNumber" error message when a number is formatted with a supported country code', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+4412345678911'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressDetails);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(false);
    });

    it('should prevent a user from writing a note of over 200 characters', () => {
        // Arrange
        const userNote = 'A';
        const addressInfo = {
            note: userNote.repeat(300)
        };

        // Act
        CheckoutComponent.inputUserNote(addressInfo);

        // Assert
        expect(CheckoutComponent.userNoteMaxCharacterCount()).toEqual('200');
    });
});
