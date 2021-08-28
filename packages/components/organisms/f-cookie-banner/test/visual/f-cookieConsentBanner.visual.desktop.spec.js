import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

let cookieBanner = new CookieBanner();

describe('New - f-cookieBanner Desktop Visual Tests', () => {
    beforeEach(() => {
        cookieBanner.load({ 'Locale': 'en-IE' });
    });

    // 'dk' and 'no' disabled for now
    forEach(['es-ES', 'en-IE', 'it-IT'])
    .it('should display the f-cookieBanner component for "%s"', tenant => {
        // Act
        cookieBanner.load({ 'Locale': tenant });

        // Assert
        browser.percyScreenshot(`f-cookiebanner - CookieConsent - ${tenant}`, 'desktop');
    });
});
