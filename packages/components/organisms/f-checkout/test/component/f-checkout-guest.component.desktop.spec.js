import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "guest" component tests - @browserstack', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: false,
            isValid: true
        };

        checkout.open(checkoutData);
        checkout.waitForComponent();
        browser.pause(2000);
    });

    it('should navigate to correct url when the login link is clicked', () => {
        // Arrange
        const loginPath = '/login';

        // Act
        checkout.clickGuestCheckoutLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    forEach([
        [100, 'firstName'],
        [100, 'lastName'],
        [200, 'userNote']
    ])
    .it('should prevent a user from entering more than "%s" characters in the "%s" field', (maxlength, field) => {
        // Arrange
        checkout.clearCheckoutForm(field);
        const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        checkout.setFieldValue(field, userEntry);

        // Assert
        expect(checkout.getFieldValue(field).length).toEqual(maxlength);
    });
});
