import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner;

describe('New - f-cookieBanner Desktop Visual Tests', () => {
    beforeEach(() => {
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('&knob-Locale', 'en-IE');

        cookieBanner.load();
    });

    // 'dk' and 'no' disabled for now
    forEach(['es-ES', 'en-IE', 'it-IT'])
    .it('should display the f-cookieBanner component for "%s"', tenant => {
        // Arrange
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('&knob-Locale', tenant);

        // Act
        browser.deleteAllCookies();
        browser.refresh();
        cookieBanner.load();

        // Assert
        browser.percyScreenshot(`f-cookiebanner - CookieConsent - ${tenant}`, 'desktop');
    });
});
