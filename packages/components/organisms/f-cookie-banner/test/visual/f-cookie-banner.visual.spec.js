import CookieBanner from '../../test-utils/component-objects/f-cookie-banner.component';

const devices = [
    'mobile',
    'desktop'
];

devices.forEach(device => {
    describe('f-cookie-banner - %s - Visual Tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        const locales = [
            'es-ES',
            'en-IE',
            'it-IT'
        ];

        locales.forEach(locale => {
            it(`should display the f-cookie-banner component for "${locale}"`, async () => {
                // Act
                await CookieBanner.load({ locale });

                // Assert
                await browser.percyScreenshot(`f-cookie-banner - cookie-consent - ${locale}`, device);
            });
        });
    });
});
