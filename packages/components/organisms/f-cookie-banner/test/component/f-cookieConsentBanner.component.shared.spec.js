import forEach from 'mocha-each';
const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');
const cookieBanner = new CookieBanner();

describe('New - f-cookieBanner component tests - @browserstack', () => {
    beforeEach(() => {
        cookieBanner.open();
        cookieBanner.waitForComponent();
    });

    it('should display the f-cookieBanner content', () => {
        // Assert
        expect(cookieBanner.isCookieBannerContentDisplayed()).toBe(true);
    });

    it('should display the f-cookieBanner accept all button', () => {
        // Assert
        expect(cookieBanner.isCookieBannerAcceptAllButtonDisplayed()).toBe(true);
    });

    it('should display the f-cookieBanner accept necessary button', () => {
        // Assert
        expect(cookieBanner.isCookieBannerAcceptNecessaryButtonDisplayed()).toBe(true);
    });

    // 'dk' and 'no' disabled for now
    forEach(['es', 'ie', 'it'])
    .it('should display the f-cookieBanner component for "%s"', tenant => {
        // Arrange
        cookieBanner.open(tenant);
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.waitForComponent();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
