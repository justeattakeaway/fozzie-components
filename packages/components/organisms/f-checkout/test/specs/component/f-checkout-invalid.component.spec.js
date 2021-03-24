const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();
import forEach from 'mocha-each';

describe('f-checkout "invalid" component tests', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'collection',
            isAuthenticated: false,
            isValid: false
        };

        checkout.open(checkoutData);
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

    forEach(['addressLine1', 'addressLine2', 'addressLocality', 'addressPostcode'])
    .it('should not display any user input fields', field => {
        // Assert
        expect(checkout.doesFieldExist(field)).toBe(false);
    });

    it('should not display error component when checkout data is valid', () => {
        const checkoutData = {
            type: '',
            isAuthenticated: false,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
        // Assert
        expect(checkout.isErrorPageComponentDisplayed()).toBe(false);
    });
});
