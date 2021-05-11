const Checkout = require('../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();

describe('f-checkout component tests - @browserstack', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            isPreOrderWarningDisplayed: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
    });

    it('should display the f-checkout component - @percy', () => {
        // Assert
        browser.percyScreenshot('f-checkout is displayed', 'shared');

        expect(checkout.isComponentDisplayed()).toBe(true);
    });

    it.skip('should submit the checkout form', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            locality: 'Test Locality',
            postcode: 'AR51 1AA',
            note: 'Doorbell is broken'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.selectOrderTime('Wednesday 00:30');
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    it('should display the mandatory "mobileNumber" field - @percy', () => {
        // Assert
        expect(checkout.isFieldDisplayed('mobileNumber')).toBe(true);
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

    // Refactor for Percy visual regression (delete maybe?)
    it('should display times in ascending order, with default text "As soon as possible" showing first - @percy', () => {
        // Act
        checkout.selectOrderTime('As soon as possible');

        // Assert
        expect(checkout.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(checkout.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(checkout.getOrderTimeOptionText(1)).toBe('Wednesday 01:45');
        expect(checkout.getOrderTimeOptionText(2)).toBe('Wednesday 02:00');
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

    it.skip('should enable a user to submit without adding a note', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            locality: 'Test Locality',
            postcode: 'AR51 1AA',
            note: ''
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.selectOrderTime('Wednesday 00:30');
        checkout.goToPayment();

        // Assert
        // Waiting for route here, so we can grab redirect url and show form submits.
    });

    // Refactor for Percy visual regression (delete maybe?)
    it('should display the switch user link - @percy', () => {
        expect(checkout.switchUserLinkIsDisplayed()).toBe(true);
    });

    it('should display the preorder warning message when ASAP is not avalible - @percy', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            isPreOrderWarningDisplayed: false
        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();

        // Assert
        expect(checkout.isPreOrderWarningDisplayed()).toBe(true);
    });

    it('should display the checkout error component when "Has Checkout Errors" is true - @percy', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            checkoutErrors: 'ISSUES'
        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(true);
    });

    it('should display the checkout error component when "Has Place Order Errors" is true - @percy', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            placeOrderErrors: 'SERVER'
        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(true);
    });

    it('should close the checkout error when "Retry" is clicked - @percy', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            checkoutErrors: 'ISSUES'
        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();
        checkout.goToPayment();
        checkout.clickRetryButton();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
    });
});
