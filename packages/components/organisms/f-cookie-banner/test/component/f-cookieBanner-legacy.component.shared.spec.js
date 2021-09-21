const CookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookieBanner component tests - @browserstack', () => {
    it('should display the f-cookieBanner component', () => {
        // Arrange
        cookieBanner.withQuery('&knob-Locale', 'en-AU');
        cookieBanner.load();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
