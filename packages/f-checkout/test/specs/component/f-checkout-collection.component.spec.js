import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "collection" component tests', () => {
    before(() => {
        browser.url('?path=/story/components-organisms--checkout-component');
        CheckoutComponent.changeCheckoutMethod(1);
        browser.switchToFrame(0);
        CheckoutComponent.waitForCheckoutComponent();
    });

    it('should display "mobileNumber" error message when collection method is set and number is incorrect', () => {
        // Arrange
        const incorrectMobileNumber = {
            mobileNumber: '1234'
        };

        // Act
        CheckoutComponent.populateCollectionCheckoutForm(incorrectMobileNumber);
        CheckoutComponent.goToPayment();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it('address fields should not exist', field => {
        // Assert
        expect(CheckoutComponent.doesFieldExist(field)).toBe(false);
    });

    it('should display the mandatory "mobileNumber" field', () => {
        // Assert
        expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
    });
});
