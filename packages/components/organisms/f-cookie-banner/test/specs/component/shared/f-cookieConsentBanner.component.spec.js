const CookieBanner = require('../../../../test-utils/component-objects/f-cookieConsentBanner.component');
const cookieBanner = new CookieBanner();
import forEach from 'mocha-each';

describe('New - f-cookieBanner component tests', () => {
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
});

describe('New - Multi-tenant - f-cookieBanner component tests', () => {
    forEach(['es', 'ie', 'it']) // 'dk' and 'no' disabled for now
    .it.only('should display the f-cookieBanner component', (tenant) => {
        // Arrange
        cookieBanner.open(tenant);
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.waitForComponent();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
