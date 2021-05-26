import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner;

describe('New - f-cookieBanner component tests - @browserstack', () => {
    beforeEach(() => {
        cookieBanner = new CookieBanner('organism', 'cookie-banner-component');
        cookieBanner.withQuery('&knob-Locale', 'en-IE');
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);
        cookieBanner.waitForComponent();
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
        ['es-ES', 'es/info/politica-de-cookies'],
        // ['dk', 'dk/cookie-erklaering'],
        ['en-IE', 'ie/info/cookies-policy'],
        ['it-IT', 'it/informazioni/politica-dei-cookie']
        // ['no', 'no/informasjonskapselerklaering']  'dk' and 'no' disabled for now
    ])
    .it('should go to the correct cookie policy page', (tenant, expectedCookiePolicyUrl) => {
        // Arrange
        cookieBanner = new CookieBanner('organism', 'cookie-banner-component');
        cookieBanner.withQuery('&knob-Locale', tenant);
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl);
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
