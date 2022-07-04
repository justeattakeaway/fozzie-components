import forEach from 'mocha-each';

const CookieBannerLegacy = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

forEach([
    'desktop',
    'mobile'
])
.describe('Legacy - f-cookie-banner - %s - Visual Tests', device => {
    let cookieBanner;

    beforeEach(async () => {
        // Arrange
        if (device === 'mobile') {
            await browser.setWindowSize(414, 731);
        }
        cookieBanner = new CookieBannerLegacy();
        await cookieBanner.open('/');
        await browser.deleteCookies();
    });

    it('should display the f-cookie-banner component', async () => {
        // Act
        await cookieBanner.load({ locale: 'en-AU' });

        // Assert
        await browser.percyScreenshot('f-cookie-banner - Legacy', device);
    });
});
