import Checkout from '../../test-utils/component-objects/f-checkout.component';

let tests;

describe('f-checkout "guest" component tests', () => {
    beforeEach(async () => {
        // Act
        await Checkout.load({
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
        await Checkout.clickGuestCheckoutLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    tests = [
        { maxLength: 100, field: 'firstName' },
        { maxLength: 100, field: 'lastName' },
        { maxLength: 50, field: 'emailAddress' }
    ];

    tests.forEach(({ maxLength, field }) => {
        it(`should prevent a user from entering more than "${maxLength}" characters in the "${field}" field`, async () => {
            // Arrange
            const userEntry = await 'A'.repeat(maxLength + 1); // Enter more than allowed

            // Act
            await Checkout.setFieldValue(field, userEntry);
            await Checkout.goToPayment();

            // Assert
            await expect((await Checkout.getFieldValue(field)).length).toEqual(maxLength);
        });
    });

    tests = [
        'jazz.man@tunetown.com',
        'jazzman@tunetown.com'

    ];

    tests.forEach(email => {
        it(`should be valid email address: "${email}"`, async () => {
            // Act
            await Checkout.setFieldValue('emailAddress', email);
            await Checkout.goToPayment();

            // Assert
            await expect(await Checkout.isEmailErrorDisplayed()).toBe(false);
        });
    });


    tests = [
        '@jazz.man@tunetown.com',
        '.jazzman@tunetown.com',
        'jazzmantunetown.com',
        'jazzman@',
        'jazzman'
    ];

    tests.forEach(email => {
        it(`should be invalid email address: "${email}"`, async () => {
            // Act
            await Checkout.setFieldValue('emailAddress', email);
            await Checkout.goToPayment();

            // Assert
            await expect(await Checkout.isEmailErrorDisplayed()).toBe(true);
        });
    });
});
