import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "guest" component tests - @browserstack', () => {
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

    it('should display the guest checkout header component - @percy', () => {
        // Assert
        expect(checkout.isGuestCheckoutHeaderDisplayed()).toBe(true);
    });

    it('should display the guest checkout login button - @percy', () => {
        // Assert
        expect(checkout.isGuestCheckoutLoginButtonDisplayed()).toBe(true);
    });

    // Refactor for Percy visual regression
    forEach(['firstName', 'lastName', 'emailAddress'])
    .it('should show the guest checkout fields for "%s" - @percy', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(true);
    });

    // Refactor for Percy visual regression
    forEach(['firstName', 'lastName', 'emailAddress'])
    .it('should display each fields error message - @percy', field => {
        // Act
        checkout.clearCheckoutForm(field);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed(field)).toBe(true);
    });

    it('should prevent user from submitting an invalid email address - @percy', () => {
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

    // Refactor for Percy visual regression
    it('should display times in ascending order, with default text "As soon as possible" showing first - @percy', () => {
        // Act
        checkout.selectOrderTime('As soon as possible');

        // Assert
        expect(checkout.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(checkout.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(checkout.getOrderTimeOptionText(1)).toBe('Wednesday 01:45');
        expect(checkout.getOrderTimeOptionText(2)).toBe('Wednesday 02:00');
    });

    it('should prevent a user from entering a First and Last Name over 100 characters', () => {
        // Arrange
        const maxlength = 100;
        const userEntry = 'A'.repeat(101);

        // Act
        checkout.inputFirstName(userEntry);
        checkout.inputLastName(userEntry);

        // Assert
        expect(checkout.firstNameMaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.lastNameMaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.fields.firstName.input.getValue().length).toEqual(maxlength);
        expect(checkout.fields.lastName.input.getValue().length).toEqual(maxlength);
    });

    it('should display a "mobileNumber" error message when an unsupported country code is used in the mobile number field - @percy', () => {
        // Arrange
        checkout.clearCheckoutForm('mobileNumber');
        const addressDetails = {
            mobileNumber: '+8112345678911'
        };

        // Act
        checkout.populateCheckoutForm(addressDetails);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });

    it('should not display a "mobileNumber" error message when a number is formatted with a supported country code - @percy', () => {
        // Arrange
        checkout.clearCheckoutForm('mobileNumber');
        const addressDetails = {
            mobileNumber: '+4412345678911'
        };

        // Act
        checkout.populateCheckoutForm(addressDetails);
        checkout.goToPayment();

        // Assert
        expect(checkout.isFieldErrorDisplayed('mobileNumber')).toBe(false);
    });

    it('should prevent a user from entering a Address lines over 255 characters', () => {
        // Arrange
        const maxlength = 255;
        const userEntry = 'A'.repeat(256);

        // Act
        checkout.inputAddressLine1(userEntry);
        checkout.inputAddressLine2(userEntry);

        // Assert
        expect(checkout.addressLine1MaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.addressLine2MaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.fields.addressLine1.input.getValue().length).toEqual(maxlength);
        expect(checkout.fields.addressLine2.input.getValue().length).toEqual(maxlength);
    });

    it('should prevent a user from entering a Locality over 50 characters', () => {
        // Arrange
        const maxlength = 50;
        const userEntry = 'A'.repeat(51);

        // Act
        checkout.inputLocality(userEntry);

        // Assert
        expect(checkout.localityMaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.fields.addressLocality.input.getValue().length).toEqual(maxlength);
    });

    it('should prevent a user from entering a Postcode over 50 characters', () => {
        // Arrange
        const maxlength = 50;
        const userEntry = 'A'.repeat(51);

        // Act
        checkout.inputPostcode(userEntry);

        // Assert
        expect(checkout.postcodeMaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.fields.addressPostcode.input.getValue().length).toEqual(maxlength);
    });

    it('should prevent a user from writing a note of over 200 characters', () => {
        // Arrange
        const maxlength = 200;
        const userEntry = 'A'.repeat(201);

        // Act
        checkout.inputUserNote(userEntry);

        // Assert
        expect(checkout.userNoteMaxCharacterCount()).toEqual(maxlength.toString());
        expect(checkout.fields.userNote.input.getValue().length).toEqual(maxlength);
    });
});
