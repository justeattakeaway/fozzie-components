import forEach from 'mocha-each';
import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "guest" component tests', () => {
    beforeEach(() => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ isLoggedIn: false });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
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
        [50, 'emailAddress']
    ])
        .it('should prevent a user from entering more than "%s" characters in the "%s" field', (maxlength, field) => {
            // Arrange
            const userEntry = 'A'.repeat(maxlength + 1); // Enter more than allowed

            // Act
            checkout.setFieldValue(field, userEntry);

            // Assert
            expect(checkout.getFieldValue(field).length).toEqual(maxlength);
        });

    forEach([
        ['jazz.man@tunetown.com'],
        ['jazzman@tunetown.com']
    ])
        .it('should be valid email address: "%s"', email => {
            // Act
            checkout.setFieldValue('emailAddress', email);
            browser.keys('Tab');

            // Assert
            expect(checkout.isEmailErrorDisplayed()).toBe(false);
        });

    forEach([
        ['@jazz.man@tunetown.com'],
        ['.jazzman@tunetown.com'],
        ['jazzmantunetown.com'],
        ['jazzman@'],
        ['jazzman']
    ])
        .it('should be invalid email address: "%s"', email => {
            // Act
            checkout.setFieldValue('emailAddress', email);
            browser.keys('Tab');

            // Assert
            expect(checkout.isEmailErrorDisplayed()).toBe(true);
        });
});
