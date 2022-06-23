import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner.component');

let cookieBanner;

forEach([
    'desktop',
    'mobile'
])
.describe('f-cookie-banner - %s - Visual Tests', device => {
    beforeEach(async () => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }
        cookieBanner = new CookieBanner();
        cookieBanner.open('/');
        await browser.deleteCookies();
    });

    // 'dk' and 'no' disabled for now
    forEach([
        'es-ES',
        'en-IE',
        'it-IT'])
    .it('should display the f-cookie-banner component for "%s"', async locale => {
        // Act
        await cookieBanner.load({ locale });

        // Assert
        await browser.percyScreenshot(`f-cookie-banner - cookie-consent - ${locale}`, device);
    });
});
