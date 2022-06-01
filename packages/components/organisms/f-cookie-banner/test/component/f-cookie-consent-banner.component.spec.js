import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-consent-banner.component');

let cookieBanner;

describe('f-cookie-banner component tests', () => {
    beforeEach(async () => {
        cookieBanner = new CookieBanner();
    });

    forEach(['full', 'necessary'])
    .it('should set "je-cookie_banner" and "je-cookieConsent" to expected cookie values for "%s"', async expectedCookieValue => {
        // Arrange
        await cookieBanner.withQuery('args', 'locale:en-IE');

        // Act
        await cookieBanner.load();
        await cookieBanner.acceptCookies(expectedCookieValue);

        // Arrange
        const [bannerCookie] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-banner_cookie');
        const [bannerConsent] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-cookieConsent');

        // Assert
        await expect(bannerCookie.value).toBe('130315');
        await expect(bannerConsent.value).toBe(expectedCookieValue);
    });

    forEach(['es-ES', 'en-IE', 'it-IT', 'en-GB'])
    .it('should display the f-cookie-banner component for "%s"', async tenant => {
        // Arrange
        await cookieBanner.withQuery('args', `locale:${tenant}`);

        // Act
        await cookieBanner.load();

        // Assert
        await expect(await cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB', 'uk/info/cookies-policy'],
        ['es-ES', 'es/info/politica-de-cookies'],
        ['en-IE', 'ie/info/cookies-policy'],
        ['it-IT', 'it/informazioni/politica-dei-cookie']
    ])
        .it('should go to the correct cookie policy page', async (tenant, expectedCookiePolicyUrl) => {
            // Arrange
            await cookieBanner.withQuery('args', `locale:${tenant}`);

            // Act
            await cookieBanner.load();
            await cookieBanner.clickCookiePolicyLink();
            await browser.switchWindow(new RegExp(`^.*${expectedCookiePolicyUrl}.*$`));

            // Assert
            await expect(await browser.getUrl()).toContain(expectedCookiePolicyUrl);
        });
});
