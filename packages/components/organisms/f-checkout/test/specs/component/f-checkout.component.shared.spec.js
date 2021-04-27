const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Checkout = require('../../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout component tests - @browserstack', () => {
    beforeEach(() => {
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true)
                .withQuery('&knob-Is ASAP available', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl);
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

    it('should enable a user to submit without adding a note', () => {
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
        checkout.withQuery('&knob-Is ASAP available', false);
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();

        // Assert
        expect(checkout.isPreOrderWarningDisplayed()).toBe(true);
    });

    it('should display the checkout error component when "Has Checkout Errors" is true', () => {
        // Arrange
        checkout.withQuery('&knob-Checkout Errors', 'ISSUES');
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(true);
    });

    it('should display the checkout error component when "Has Place Order Errors" is true', () => {
        // Arrange
        checkout.withQuery('knob-Place Order Errors', 'SERVER');
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(true);
    });

    it('should display the checkout error component when "Has Place Order Errors" is true', () => {
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

    it('should close the checkout error when "Retry" is clicked', () => {
        // Arrange
        checkout.withQuery('&knob-Checkout Errors', 'ISSUES');
        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        // Act
        checkout.open(pageUrl);
        checkout.waitForComponent();
        checkout.goToPayment();
        checkout.clickRetryButton();

        // Assert
        expect(checkout.isCheckoutErrorMessageDisplayed()).toBe(false);
    });
});
