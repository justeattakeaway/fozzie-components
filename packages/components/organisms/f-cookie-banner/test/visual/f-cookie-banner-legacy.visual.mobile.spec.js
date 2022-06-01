const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookie-banner Mobile Visual Tests', () => {
    it('should display the f-cookie-banner component', async () => {
        // Arrange
        await cookieBanner.withQuery('args', 'locale:en-AU');

        // Act
        await cookieBanner.load();

        // Assert
        await browser.percyScreenshot('f-cookie-banner - Legacy', 'mobile');
    });
});
