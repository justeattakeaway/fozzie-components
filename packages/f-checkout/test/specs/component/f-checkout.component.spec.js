import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    })

    it('should display the f-checkout component', () => {
        // Assert
        expect(CheckoutComponent.isCheckoutComponentDisplayed()).toBe(true);
    });
});
