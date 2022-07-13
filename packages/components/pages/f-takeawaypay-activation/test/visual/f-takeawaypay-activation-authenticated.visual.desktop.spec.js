import TakeawayPayComponent from '../../test-utils/component-objects/f-takeawaypayActivation-authenticated.component';

describe('f-takeawaypay-activation - Authenticated - Desktop Visual Tests', () => {
    const locales = [
        'en-GB',
        'en-AU'
    ];

    locales.forEach(locale => {
        beforeEach(async () => {
            // Arrange
            await TakeawayPayComponent.load({ locale, isLoggedIn: true });
        });

        it(`should display user details when the user is logged in and tenant is "${locale}"`, async () => {
            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Authenticated - ${locale}`, 'desktop');
        });

        it(`should display a successful message when the activation is successful and tenant is "${locale}"`, async () => {
            // Act
            await TakeawayPayComponent.clickActivateTakeawayPayButton();
            await TakeawayPayComponent.waitForActivationSuccessComponent();
            await browser.pause(500);

            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Successful activation - ${locale}`, 'desktop');
        });
    });
});
