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
        ['firstName', 100],
        ['lastName', 100],
        ['userNote', 200]
    ])
    .it('should prevent a user from entering more characters than allowed in a field', (field, maxlength) => {
        // Arrange
        checkout.clearCheckoutForm(field);
        const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

        // Act
        checkout.setField(field, userEntry);

        // Assert
        expect(checkout.getField(field).length).toEqual(maxlength);
    });
});
