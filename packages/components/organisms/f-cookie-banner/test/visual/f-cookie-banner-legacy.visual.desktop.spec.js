const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookie-banner Desktop Visual Tests', () => {
    it('should display the f-cookie-banner component', () => {
        // Arrange
        cookieBanner.withQuery('args', 'locale:en-AU');

        // Act
        cookieBanner.load();

        // Assert
        browser.percyScreenshot('f-cookie-banner - Legacy', 'desktop');
    });
});
