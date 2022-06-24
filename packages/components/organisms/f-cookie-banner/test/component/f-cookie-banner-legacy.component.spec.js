import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

describe('Legacy - f-cookie-banner component tests', () => {
    let cookieBanner;

    beforeEach(async () => {
        // Arrange
        cookieBanner = new CookieBanner();
    });

    it('should display the f-cookie-banner legacy component', async () => {
        // Act
        cookieBanner.open('/');
        await browser.deleteCookies();
        await cookieBanner.load({ locale: 'en-AU', shouldShowLegacyBanner: true });

        // Assert
        await expect(await cookieBanner.isComponentDisplayed()).toBe(true);
    });

    it('should set "je-cookie_banner" cookie when dismissed.', async () => {
        // Act
        cookieBanner.open('/');
        await browser.deleteCookies();
        await cookieBanner.load({ locale: 'en-AU', shouldShowLegacyBanner: true });
        await cookieBanner.close();

        // Assert
        const [bannerCookie] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-banner_cookie');
        await expect(bannerCookie.value).toBe('130315');
        await expect(await cookieBanner.isComponentDisplayed()).toBe(false);
    });

    forEach([
        ['en-AU', 'au/info/privacy-policy#cookies_policy'],
        ['en-NZ', 'nz/info/privacy-policy#cookies_policy']
    ])
    .it('should go to the correct cookie policy page for "%s" - "%s"', (tenant, expectedCookiePolicyUrl) => {
        // Act
        cookieBanner.open('/');
        browser.deleteCookies();
        cookieBanner.load({ locale: tenant, shouldShowLegacyBanner: true });
        cookieBanner.clickCookiePolicyLink();

        // Assert
        expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
