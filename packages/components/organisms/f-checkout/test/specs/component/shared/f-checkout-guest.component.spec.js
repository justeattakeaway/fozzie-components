import forEach from 'mocha-each';

const Checkout = require('../../../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout component tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: false,
            isValid: true,
            isPreOrderWarningDisplayed: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
        browser.pause(2000);
    });

    it('should display the guest checkout header component', () => {
        // Assert
        expect(checkout.isGuestCheckoutHeaderDisplayed()).toBe(true);
    });

    it('should display the guest checkout login button', () => {
        // Assert
        expect(checkout.isGuestCheckoutLoginButtonDisplayed()).toBe(true);
    });

    forEach(['firstName', 'lastName', 'emailAddress'])
    .it('should show the guest checkout fields', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'emailAddress'])
    .it('should display each fields error message', field => {
        // Act
        checkout.clearCheckoutForm(field);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed(field)).toBe(true);
    });

    it('should prevent user from submitting an invalid email address', () => {
        // Arrange
        const emailAddress = {
            emailAddress: 'abc@abc'
        };

        // Act
        checkout.populateGuestCheckoutForm(emailAddress);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed('emailAddress')).toBe(true);
    });

    it('should navigate to correct url when the login link is clicked', () => {
        // Arrange
        const loginPath = '/login';

        // Act
        checkout.clickGuestCheckoutLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    it('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Act
        checkout.selectOrderTime('As soon as possible');

        // Assert
        expect(checkout.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(checkout.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(checkout.getOrderTimeOptionText(1)).toBe('Wednesday 01:45');
        expect(checkout.getOrderTimeOptionText(2)).toBe('Wednesday 02:00');
    });

    it('should display a "mobileNumber" error message when an unsupported country code is used in the mobile number field', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+8112345678911'
        };

        // Act
        checkout.populateCheckoutForm(addressDetails);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });

    it('should not display a "mobileNumber" error message when a number is formatted with a supported country code', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+4412345678911'
        };

        // Act
        checkout.populateCheckoutForm(addressDetails);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed('mobileNumber')).toBe(false);
    });

    it('should prevent a user from writing a note of over 200 characters', () => {
        // Arrange
        const userNote = 'A';
        const addressInfo = {
            note: userNote.repeat(300)
        };

        // Act
        checkout.inputUserNote(addressInfo);

        // Assert
        expect(checkout.userNoteMaxCharacterCount()).toEqual('200');
    });
});
