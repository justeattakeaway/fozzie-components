import TakeawayPayComponent from '../../test-utils/component-objects/f-takeawaypayActivation-error.component';

describe('f-takeawaypay-activation - Error page - Desktop Visual Tests', () => {
    const locales = [
        'en-GB',
        'en-AU'
    ];

    locales.forEach(locale => {
        it(`should display the component when there is an error and tenant is "${locale}"`, async () => {
            // Arrange
            await TakeawayPayComponent.load({ locale, activationStatusResponse: '400' });

            // Assert
            await browser.percyScreenshot(`f-takeawaypay-activation - Error - ${locale}`, 'desktop');
        });
    });
});
