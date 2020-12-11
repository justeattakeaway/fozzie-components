import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "delivery" component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--checkout-component');
        browser.switchToFrame(0);
        CheckoutComponent.waitForCheckoutComponent();
    });

    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
    .it.skip('each fields error message should be displayed', field => {
        // Act
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it.skip('address fields should exist', field => {
        // Assert
        expect(CheckoutComponent.doesInputFieldExist(field)).toBe(true);
    });

    it.skip('should display the mandatory fields', () => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
    });

    it.skip('should display a "mobileNumber" error message when a number format is incorrectly entered', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+4512345678911'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressDetails);
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });

    it.skip('should not display a "mobileNumber" error message when a number is formatted correctly', () => {
        // Arrange
        const addressDetails = {
            mobileNumber: '+4412345678911'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressDetails);
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(false);
    });

    it('should prevent user from submitting a postcode with illegal characters', () => {
        // Arrange
        const addressInfo = {
            postcode: 'TEST1A'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldTypeErrorDisplayed('addressPostcode')).toBe(true);
    }); 

    it('should enable a user to submit a postcode with correct characters', () => {
        // Arrange
        const addressInfo = {
            postcode: 'AR51 1AA'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldTypeErrorDisplayed('addressPostcode')).toBe(false);
    });
});
