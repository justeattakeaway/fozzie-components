const CookieBanner = require('../../../../test-utils/component-objects/f-cookieConsentBanner.component');
const cookieBanner = new CookieBanner();
import forEach from 'mocha-each';

describe('New - f-cookieBanner component tests', () => {
    beforeEach(() => {
        cookieBanner.open();
        cookieBanner.waitForComponent();
    });

    forEach([['full'], ['necessary']])
    .it('should set "je-cookie_banner" and "je-cookieConsent" to expected cookie values', expectedCookieValue => {
        // Act
        cookieBanner.acceptCookies(expectedCookieValue);

        // Arrange
        const bannerCookie = browser.getCookies().filter(cookie => cookie.name === 'je-banner_cookie')[0];
        const bannerConsent = browser.getCookies().filter(cookie => cookie.name === 'je-cookieConsent')[0];

        // Assert
        expect(bannerCookie.value).toBe('130315');
        expect(bannerConsent.value).toBe(expectedCookieValue);
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(false);
    });
});


describe('New - Multi-tenant - f-cookieBanner component tests', () => {
    forEach([
        ['es', 'es/info/politica-de-cookies'],
        // ['dk', 'dk/cookie-erklaering'],
        ['ie', 'ie/info/cookies-policy'],
        ['it', 'it/informazioni/politica-dei-cookie']
        // ['no', 'no/informasjonskapselerklaering']  'dk' and 'no' disabled for now
    ])
    .it('should go to the correct cookie policy page', (tenant, expectedCookiePolicyUrl) => {

        // Arrange
        cookieBanner.open(tenant);
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.waitForComponent();

        // Act
        cookieBanner.clickCookiePolicyLink();
        browser.switchWindow(new RegExp(`^.*${expectedCookiePolicyUrl}.*$`));

        // Assert
        expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
