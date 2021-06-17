import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
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

    // 'dk' and 'no' disabled for now
    forEach(['es-ES', 'en-IE', 'it-IT'])
    .it('should display the f-cookieBanner component for "%s"', tenant => {
        // Arrange
        cookieBanner = new CookieBanner('organism', 'cookie-banner-component');
        cookieBanner.withQuery('&knob-Locale', tenant);
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        // Act
        cookieBanner.open(pageUrl);
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-cookiebanner - CookieConsent - ${tenant}`, 'shared');
    });
});
