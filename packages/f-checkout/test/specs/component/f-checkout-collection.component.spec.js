import forEach from 'mocha-each';
import DemoControls from '../../../test-utils/component-objects/demo-controls';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "collection" component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--checkout-component');
        browser.switchToFrame(0);
        CheckoutComponent.waitForCheckoutComponent();
    });

    forEach(['mobileNumber'])
    .it.skip('each fields error message should be displayed', field => {
        // Arrange
        DemoControls.selectCheckoutMethod('collection');

        // Act
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it.skip('address fields should not exist', field => {
        // Arrange
        DemoControls.selectCheckoutMethod('collection');

        // Assert
        expect(CheckoutComponent.doesInputFieldExist(field)).toBe(false);
    });

    forEach(['mobileNumber'])
    .it.skip('should display the mandatory fields', field => {
        // Arrange
        DemoControls.selectCheckoutMethod('collection');

        // Assert
        expect(CheckoutComponent.isFieldDisplayed(field)).toBe(true);
    });
});
