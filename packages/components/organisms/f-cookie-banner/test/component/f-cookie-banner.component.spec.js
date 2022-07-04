import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner.component');

describe('f-cookie-banner component tests', () => {
    let cookieBanner;

    beforeEach(async () => {
        cookieBanner = new CookieBanner();
        await cookieBanner.open('/');
        await browser.deleteCookies();
    });

    forEach([
        'full',
        'necessary'
    ])
    .it('should set "je-cookie_banner" and "je-cookieConsent" to expected cookie values for "%s"', async expectedCookieValue => {
        // Act
        await cookieBanner.load({ locale: 'en-IE' });
        await cookieBanner.acceptCookies(expectedCookieValue);

        // Arrange
        const [bannerCookie] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-banner_cookie');
        const [bannerConsent] = (await browser.getCookies()).filter(cookie => cookie.name === 'je-cookieConsent');

        // Assert
        await expect(await bannerCookie.value).toBe('130315');
        await expect(await bannerConsent.value).toBe(expectedCookieValue);
    });

    forEach([
        'es-ES',
        'en-IE',
        'it-IT',
        'en-GB'
    ])
    .it('should display the f-cookie-banner component for "%s"', async locale => {
        // Act
        await cookieBanner.load({ locale });

        // Assert
        await expect(await cookieBanner.isComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB', 'uk/info/cookies-policy'],
        ['es-ES', 'es/info/politica-de-cookies'],
        ['en-IE', 'ie/info/cookies-policy'],
        ['it-IT', 'it/informazioni/politica-dei-cookie']
    ])
    .it('should go to the correct cookie policy page', async (locale, expectedCookiePolicyUrl) => {
        // Act
        await cookieBanner.load({ locale });

        // Assert
        await expect(await cookieBanner.getCookiePolicyUrl()).toContain(expectedCookiePolicyUrl);
    });
});
