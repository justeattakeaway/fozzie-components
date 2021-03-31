const Checkout = require('../../../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout component tests', () => {
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

    it('should display the f-checkout component', () => {
        // Assert
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

    it('should display the mandatory "mobileNumber" field', () => {
        // Assert
        expect(checkout.isFieldDisplayed('mobileNumber')).toBe(true);
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

    it('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Act
        checkout.selectOrderTime('As soon as possible');

        // Assert
        expect(checkout.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(checkout.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(checkout.getOrderTimeOptionText(1)).toBe('Wednesday 01:45');
        expect(checkout.getOrderTimeOptionText(2)).toBe('Wednesday 02:00');
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

    it('should display the switch user link', () => {
        expect(checkout.switchUserLinkIsDisplayed()).toBe(true);
    });

    it('should display the preorder warning message when ASAP is not avalible', () => {
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

    it('should display the checkout error component when "Has Checkout Errors" is true', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            checkoutErrors: true
        };

        // Act
        checkout.open(checkoutData);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(true);
    });

    it('should close the checkout error when "Retry" is clicked', () => {
        // Arrange
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true,
            checkoutErrors: true
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
