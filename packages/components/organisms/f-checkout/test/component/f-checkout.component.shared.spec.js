const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout component tests - @browserstack', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: true,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
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

    it('should close the checkout error when "Retry" is clicked', () => {
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

    it('should not display the error summary', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '',
            line1: 'Test House',
            line2: 'High Street',
            locality: 'Test Locality',
            postcode: 'AR51 1AA',
            note: 'Doorbell is broken'
        };

        // Act
        checkout.populateCheckoutForm(addressInfo);
        checkout.goToPayment();

        // Arrange
        expect(checkout.isErrorSummaryVisible()).toBe(false);
    });
});
