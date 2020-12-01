import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';
// import WebdriverExtensions from '../../../../../test/utils/webdriverio-extensions';
import { ERRORS } from '../../../test-utils/component-objects/f-checkout-selectors';

describe('f-checkout component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
        CheckoutComponent.waitForCheckoutComponent();
    });

    it('should display the f-checkout component', () => {
        // Assert
        expect(CheckoutComponent.isCheckoutComponentDisplayed()).toBe(true);
    });

    it('should display the allergen link', () => {
        // Assert
        expect(CheckoutComponent.isAllergenLinkDisplayed()).toBe(true);
    });

    forEach(Object.keys(CheckoutComponent.errorMessages))
                .it.only('each fields error message should be displayed', key => {
                    // Act
                    CheckoutComponent.submit();
                    CheckoutComponent.WaitForErrorMessage(key);

                    // Assert
                    expect(CheckoutComponent.errorMessages[key]().isDisplayed()).toBe(true);
                });

    forEach(Object.keys(CheckoutComponent.errorMessages)).it('each fields error message should not be displayed by default', key => {
        // Assert
        expect(CheckoutComponent.errorMessages[key]().isDisplayed()).toBe(false);
    });

    forEach(Object.keys(CheckoutComponent.inputs)).it('should display all fields', key => {
        // Assert
        expect(CheckoutComponent.inputs[key]().isDisplayed()).toBe(true);
    });

    it('should submit the checkout form', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
            postcode: 'AR51 1AA'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.inputUserNote('No mushrooms!');
        CheckoutComponent.selectFulfillmentTime('As soon as possible');
        CheckoutComponent.submit();
    });
});
