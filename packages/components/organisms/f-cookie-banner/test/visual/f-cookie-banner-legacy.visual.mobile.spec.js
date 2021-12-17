const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookie-banner Mobile Visual Tests', () => {
    it('should display the f-cookie-banner component', () => {
        // Arrange
        cookieBanner.withQuery('&knob-Locale', 'en-AU');

        cookieBanner.load();

        // Assert
        browser.percyScreenshot('f-cookie-banner - Legacy', 'mobile');
    });
});
