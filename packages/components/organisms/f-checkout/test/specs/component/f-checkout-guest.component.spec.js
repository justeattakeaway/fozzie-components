import forEach from 'mocha-each';

const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const buildUrl = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const checkout = new Checkout('organism', 'checkout-component');

describe('f-checkout component tests', () => {
    beforeEach(() => {
        checkout.withQuery('knob-Service Type', 'delivery')
        .withQuery('knob-Is User Logged In', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl)
            .waitForComponent();
    });

    it.skip('should display the guest checkout header component', () => {
        // Assert
        expect(checkout.isGuestCheckoutHeaderDisplayed()).toBe(true);
    });

    it.skip('should display the guest checkout login button', () => {
        // Assert
        expect(checkout.isGuestCheckoutLoginButtonDisplayed()).toBe(true);
    });

    forEach(['firstName', 'lastName', 'emailAddress'])
    .it.skip('should show the guest checkout fields', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'emailAddress'])
    .it.skip('should display each fields error message', field => {
        // Act
        checkout.clearCheckoutForm(field);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed(field)).toBe(true);
    });

    it.skip('should prevent user from submitting an invalid email address', () => {
        // Arrange
        const emailAddress = {
            emailAddress: 'abc@abc'
        };

        // Act
        checkout.populateCheckoutForm(emailAddress);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed('emailAddress')).toBe(true);
    });

    it.skip('should navigate to correct url when the login link is clicked', () => {
        // Arrange
        const loginPath = '/login';

        // Act
        checkout.clickGuestCheckoutLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    it.skip('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Act
        checkout.selectOrderTime('As soon as possible');

        // Assert
        expect(checkout.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(checkout.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(checkout.getOrderTimeOptionText(1)).toBe('Wednesday 00:45');
        expect(checkout.getOrderTimeOptionText(2)).toBe('Wednesday 01:00');
    });

    it.skip('should display a "mobileNumber" error message when an unsupported country code is used in the mobile number field', () => {
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

    it.skip('should not display a "mobileNumber" error message when a number is formatted with a supported country code', () => {
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

    it.skip('should prevent a user from writing a note of over 200 characters', () => {
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
