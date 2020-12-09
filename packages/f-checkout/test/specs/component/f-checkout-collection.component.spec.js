import forEach from 'mocha-each';
import DemoControls from '../../../test-utils/component-objects/demo-controls';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout "collection" component tests', () => {
    it('each fields error message should be displayed', () => {
        // Arrange
        DemoControls.selectCheckoutMethod('collection');

        // Act
        CheckoutComponent.submit();

        // Assert
        expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(true);
    });

    forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
    .it('address fields should not exist', field => {
        // Arrange
        DemoControls.selectCheckoutMethod('collection');

        // Assert
        expect(CheckoutComponent.doesInputFieldExist(field)).toBe(false);
    });

    it('should display the mandatory fields', () => {
        // Arrange
        DemoControls.selectCheckoutMethod('collection');

        // Assert
        expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
    });
});
