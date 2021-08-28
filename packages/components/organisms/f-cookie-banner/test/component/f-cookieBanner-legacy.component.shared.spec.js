const CookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

const cookieBanner = new CookieBanner();

describe('Legacy - f-cookieBanner component tests - @browserstack', () => {
    it('should display the f-cookieBanner component', () => {
        // Arrange
        cookieBanner.load({'Locale': 'en-AU'});

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
