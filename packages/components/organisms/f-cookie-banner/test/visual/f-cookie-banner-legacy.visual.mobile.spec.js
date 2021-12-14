const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookieBanner Mobile Visual Tests', () => {
    it('should display the f-cookie-banner component', () => {
        // Arrange
        cookieBanner.withQuery('&knob-Locale', 'en-AU');

        cookieBanner.load();

        // Assert
        browser.percyScreenshot('f-cookiebanner - Legacy', 'mobile');
    });
});
