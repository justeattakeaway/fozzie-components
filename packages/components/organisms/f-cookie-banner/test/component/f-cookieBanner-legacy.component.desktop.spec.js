import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const CookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

let cookieBanner;

describe('Legacy - f-cookieBanner component tests @browserstack', () => {
    beforeEach(() => {
        cookieBanner = new CookieBanner('organism', 'cookie-banner-component');
        cookieBanner.withQuery('&knob-Locale', 'en-AU');
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);
        cookieBanner.open(pageUrl);
        cookieBanner.waitForComponent();
    });

    it('should set "je-cookie_banner" cookie when dismissed.', () => {
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
        ['en-AU', 'au/info/privacy-policy#cookies_policy'],
        ['en-NZ', 'nz/info/privacy-policy#cookies_policy']
    ])
    .it('should go to the correct cookie policy page for "%s" - "%s"', (tenant, expectedCookiePolicyUrl) => {
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

        // Assert
        expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
