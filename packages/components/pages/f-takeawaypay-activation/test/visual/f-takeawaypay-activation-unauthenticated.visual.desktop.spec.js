import TakeawayPayComponent from '../../test-utils/component-objects/f-takeawaypayActivation.component';

describe('f-takeawaypay-activation - Unauthenticated - Desktop Visual Tests', () => {
    const locales = [
        'en-GB',
        'en-AU'
    ];

    locales.forEach(locale => {
        it(`should display the component when the user is not logged in and tenant is "${locale}"`, async () => {
            // Arrange
            await TakeawayPayComponent.load({ locale, isLoggedIn: false });

            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Unauthenticated - ${locale}`, 'desktop');
        });
    });
});
