import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

const checkout = new Checkout();

describe('f-checkout "guest" component tests - @browserstack', () => {
    beforeEach(() => {
        const checkoutData = {
            type: 'delivery',
            isAuthenticated: false,
            isValid: true,
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

    it('should prevent a user from writing a note of over 200 characters', () => {
        // Arrange
        const userNote = 'A';
        const addressInfo = {
            note: userNote.repeat(300)
        };

        // Act
        checkout.inputUserNote(addressInfo);

        // Assert
        expect(checkout.userNoteMaxCharacterCount()).toEqual('200');
    });
});
