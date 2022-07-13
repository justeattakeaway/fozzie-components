import TakeawayPayComponent from '../../test-utils/component-objects/f-takeawaypayActivation-error.component';

describe('f-takeawaypay-activation - Error page - Mobile Visual Tests', () => {
    const locales = [
        'en-GB',
        'en-AU'
    ];

    locales.forEach(locale => {
        beforeEach(async () => {
            // Arrange
            await TakeawayPayComponent.load({ locale, activationStatusResponse: '400' });
        });

        it(`should display the component when there is an error and tenant is "${locale}"`, async () => {
            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Error - ${locale}`, 'mobile');
        });
    });
});
