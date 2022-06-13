import forEach from 'mocha-each';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "guest" component tests', () => {
    beforeEach(async () => {
        // Arrange
        checkout = new Checkout();

        // Act
        await checkout.load({
            serviceType: 'delivery',
            isLoggedIn: false,
            isAsapAvailable: true,
            locale: 'en-GB'
        });
    });

    it('should navigate to correct url when the login link is clicked', async () => {
        // Arrange
        const loginPath = '/login';

        // Act
        await checkout.clickGuestCheckoutLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    forEach([
        [100, 'firstName'],
        [100, 'lastName'],
        [50, 'emailAddress']
    ])
        .it('should prevent a user from entering more than "%s" characters in the "%s" field', async (maxlength, field) => {
            // Arrange
            const userEntry = await 'A'.repeat(maxlength + 1); // Enter more than allowed

            // Act
            await checkout.setFieldValue(field, userEntry);
            await checkout.goToPayment();

            // Assert
            expect((await checkout.getFieldValue(field)).length).toEqual(maxlength);
        });

    forEach([
        ['jazz.man@tunetown.com'],
        ['jazzman@tunetown.com']
    ])
        .it('should be valid email address: "%s"', async email => {
            // Act
            await checkout.setFieldValue('emailAddress', email);
            await checkout.goToPayment();

            // Assert
            expect(await checkout.isEmailErrorDisplayed()).toBe(false);
        });

    forEach([
        ['@jazz.man@tunetown.com'],
        ['.jazzman@tunetown.com'],
        ['jazzmantunetown.com'],
        ['jazzman@'],
        ['jazzman']
    ])
        .it('should be invalid email address: "%s"', async email => {
            // Act
            await checkout.setFieldValue('emailAddress', email);
            await checkout.goToPayment();

            // Assert
            expect(await checkout.isEmailErrorDisplayed()).toBe(true);
        });
});
