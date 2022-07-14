import TakeawayPayComponent from '../../test-utils/component-objects/f-takeawaypayActivation-authenticated.component';

describe('f-takeawaypay-activation - Authenticated - Mobile Visual Tests', () => {
    const locales = [
        'en-GB',
        'en-AU'
    ];

    locales.forEach(locale => {
        it(`should display user details when the user is logged in and tenant is "${locale}"`, async () => {
            // Arrange
            await TakeawayPayComponent.load({ locale, isLoggedIn: true });

            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Authenticated - ${locale}`, 'mobile');
        });

        it(`should display a successful message when the activation is successful and tenant is "${locale}"`, async () => {
            // Arrange
            await TakeawayPayComponent.load({ locale, isLoggedIn: true });

            // Act
            await TakeawayPayComponent.clickActivateTakeawayPayButton();
            await TakeawayPayComponent.waitForActivationSuccessComponent();
            await browser.pause(500);

            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Successful activation - ${locale}`, 'mobile');
        });
    });
});
