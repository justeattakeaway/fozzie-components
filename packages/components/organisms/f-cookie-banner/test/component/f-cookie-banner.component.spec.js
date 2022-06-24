import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner.component');

describe('f-cookie-banner component tests', () => {
    let cookieBanner;

    beforeEach(async () => {
        cookieBanner = new CookieBanner();
        cookieBanner.open('/');
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
        expect(bannerCookie.value).toBe('130315');
        expect(bannerConsent.value).toBe(expectedCookieValue);
    });

    forEach([
        'es-ES',
        'en-IE',
        'it-IT',
        'en-GB'
    ])
    .it('should display the f-cookie-banner component for "%s"', locale => {
        // Act
        cookieBanner.load({ locale });

        // Assert
        expect(cookieBanner.isComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB', 'uk/info/cookies-policy'],
        ['es-ES', 'es/info/politica-de-cookies'],
        ['en-IE', 'ie/info/cookies-policy'],
        ['it-IT', 'it/informazioni/politica-dei-cookie']
    ])
    .it('should go to the correct cookie policy page', (locale, expectedCookiePolicyUrl) => {
        // Act
        cookieBanner.load({ locale });
        cookieBanner.clickCookiePolicyLink();
        browser.switchWindow(new RegExp(`^.*${expectedCookiePolicyUrl}.*$`));

        // Assert
        expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
