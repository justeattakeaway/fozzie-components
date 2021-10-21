const CookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookieBanner Mobile Visual Tests', () => {
    it('should display the f-cookieBanner component', () => {
        // Arrange
        cookieBanner.withQuery('&knob-Locale', 'en-AU');
        
        cookieBanner.load();

        // Assert
        browser.percyScreenshot('f-cookiebanner - Legacy', 'mobile');
    });
});
