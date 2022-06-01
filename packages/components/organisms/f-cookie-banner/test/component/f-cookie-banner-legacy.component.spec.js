import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

let cookieBanner;

describe('Legacy - f-cookie-banner component tests', () => {
    beforeEach(async () => {
        // Arrange
        cookieBanner = new CookieBanner();
        await cookieBanner.withQuery('args', 'locale:en-AU');

        // Act
        await cookieBanner.load();
    });

    it('should display the f-cookie-banner component', async () => {
        // Assert
        await expect(await cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });

    it('should set "je-cookie_banner" cookie when dismissed.', async () => {
        // Act
        await cookieBanner.close();

        // Assert
        const [bannerCookie] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-banner_cookie');
        await expect(bannerCookie.value).toBe('130315');
        await expect(await cookieBanner.isCookieBannerComponentDisplayed()).toBe(false);
    });

    forEach([
        ['en-AU', 'au/info/privacy-policy#cookies_policy'],
        ['en-NZ', 'nz/info/privacy-policy#cookies_policy']
    ])
    .it('should go to the correct cookie policy page for "%s" - "%s"', async (tenant, expectedCookiePolicyUrl) => {
        // Arrange
        cookieBanner = new CookieBanner();
        await cookieBanner.withQuery('args', `locale:${tenant}`);

        // Act
        await cookieBanner.load();
        await cookieBanner.clickCookiePolicyLink();

        // Assert
        await expect(await browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
