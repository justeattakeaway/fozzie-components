import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner = new CookieBanner();

describe('New - f-cookieBanner component tests - @browserstack', () => {
    beforeEach(() => {
        cookieBanner.load({ 'Locale': 'en-IE' });
    });

    forEach(['full', 'necessary'])
        .it('should set "je-cookie_banner" and "je-cookieConsent" to expected cookie values for "%s"', expectedCookieValue => {
            // Act
            cookieBanner.acceptCookies(expectedCookieValue);

            // Arrange
            const bannerCookie = browser.getCookies().filter(cookie => cookie.name === 'je-banner_cookie')[0];
            const bannerConsent = browser.getCookies().filter(cookie => cookie.name === 'je-cookieConsent')[0];

            // Assert
            expect(bannerCookie.value).toBe('130315');
            expect(bannerConsent.value).toBe(expectedCookieValue);
        });
});


describe('New - Multi-tenant - f-cookieBanner component tests', () => {
    forEach([
        ['en-GB', 'uk/info/cookies-policy'],
        ['es-ES', 'es/info/politica-de-cookies'],
        // ['dk', 'dk/cookie-erklaering'],
        ['en-IE', 'ie/info/cookies-policy'],
        ['it-IT', 'it/informazioni/politica-dei-cookie']
        // ['no', 'no/informasjonskapselerklaering']  'dk' and 'no' disabled for now
    ])
        .it('should go to the correct cookie policy page', (tenant, expectedCookiePolicyUrl) => {
            // Arrange
            cookieBanner.load({ 'Locale': tenant });

            // Act
            cookieBanner.clickCookiePolicyLink();
            browser.switchWindow(new RegExp(`^.*${expectedCookiePolicyUrl}.*$`));

            // Assert
            expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
        });
});
