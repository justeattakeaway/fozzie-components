const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const buildUrl = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const checkout = new Checkout('organism', 'checkout-component');

describe('f-checkout component tests', () => {
    before(() => {
        checkout.withQuery('knob-Service Type', 'delivery')
                .withQuery('knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);

        checkout.open(pageUrl)
            .waitForComponent();
    });

    it.skip('should display the f-checkout component', () => {
        // Assert
        expect(checkout.isComponentDisplayed()).toBe(true);
    });

    it.skip('should submit the checkout form', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
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

    it.skip('should display the mandatory "mobileNumber" field', () => {
        // Assert
        expect(checkout.isFieldDisplayed('mobileNumber')).toBe(true);
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

    it.skip('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Act
        checkout.selectOrderTime('As soon as possible');

        // Assert
        expect(checkout.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(checkout.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(checkout.getOrderTimeOptionText(1)).toBe('Wednesday 00:45');
        expect(checkout.getOrderTimeOptionText(2)).toBe('Wednesday 01:00');
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

    it.skip('should enable a user to submit without adding a note', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
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

    it.skip('should display the switch user link', () => {
        expect(checkout.switchUserLinkIsDisplayed()).toBe(true);
    });
});
