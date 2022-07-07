import CookieBannerLegacy from '../../test-utils/component-objects/f-cookie-banner-legacy.component';

const devices = [
    'mobile',
    'desktop'
];

devices.forEach(device => {
    describe(`Legacy - f-cookie-banner - ${device} - Visual Tests`, () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-cookie-banner component', async () => {
            // Act
            await CookieBannerLegacy.load({ locale: 'en-AU' });

            // Assert
            await browser.percyScreenshot('f-cookie-banner - Legacy', device);
        });
    });
});
