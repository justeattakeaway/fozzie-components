const Checkout = require('../../../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();

describe('f-checkout "invalid" component tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: true,
            isValid: false
        };

        checkout.open(checkoutData);
        checkout.waitForErrorPageComponent();
    });

    it('should not display the checkout component', () => {
        // Assert
        expect(checkout.isComponentDisplayed()).toBe(false);
    });

    it('should display the error page component', () => {
        // Assert
        expect(checkout.isErrorPageComponentDisplayed()).toBe(true);
    });

    it('should display elements within error page component', () => {
        // Assert
        expect(checkout.isErrorPageImageDisplayed()).toBe(true);
        expect(checkout.isErrorPageHeadingDisplayed()).toBe(true);
        expect(checkout.isErrorPageDescriptionDisplayed()).toBe(true);
    });
});
