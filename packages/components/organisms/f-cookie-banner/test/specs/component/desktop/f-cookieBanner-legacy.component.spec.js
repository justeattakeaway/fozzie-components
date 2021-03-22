const CookieBanner = require('../../../../test-utils/component-objects/f-cookieBanner-legacy.component');
const cookieBanner = new CookieBanner();
import forEach from 'mocha-each';

describe('Legacy - f-cookieBanner component tests', () => {
    beforeEach(() => {
        cookieBanner.open();
        cookieBanner.waitForComponent();
    });

    it('should set "je-cookie_banner" cookie when dismissed', () => {
        // Act
        cookieBanner.close();

        // Assert
        const bannerCookie = browser.getCookies().filter(cookie => cookie.name === 'je-banner_cookie')[0];
        expect(bannerCookie.value).toBe('130315');
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(false);
    });
});

describe('Legacy - Multi-tenant - f-cookieBanner component tests', () => {
    forEach([
        ['gb', 'uk/info/cookies-policy'],
        ['au', 'au/info/privacy-policy#cookies_policy'],
        ['nz', 'nz/info/privacy-policy#cookies_policy']
    ])
    .it('should go to the correct cookie policy page', (tenant, expectedCookiePolicyUrl) => {

        // Arrange
        cookieBanner.open(tenant);
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.waitForComponent();

        // Act
        cookieBanner.clickCookiePolicyLink();

        // Assert
        expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
