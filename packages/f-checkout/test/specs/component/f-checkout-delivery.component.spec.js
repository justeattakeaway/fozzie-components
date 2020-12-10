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

    forEach(['mobileNumber'])
    .it.skip('should display the mandatory fields', field => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed(field)).toBe(true);
    });

    it('should prevent user from submitting a postcode with illegal characters', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
            postcode: 'TEST1A', 
            note: ''
        };
        const field = 'addressPostcode'

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.submit();
        // Assert
        expect(CheckoutComponent.isTypeErrorDisplayed(field)).toBe(true);
    }); 

    it('should enable a user to submit a postcode with correct characters', () => {
           // Arrange
           const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
            postcode: 'AR51 1AA', 
            note: ''
        };
           const field = 'addressPostcode'

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isTypeErrorDisplayed(field)).toBe(false);
    });
});
