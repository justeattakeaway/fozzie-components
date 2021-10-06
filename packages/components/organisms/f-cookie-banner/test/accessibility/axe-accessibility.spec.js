const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const LegacyCookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

const legacyCookieBanner = new LegacyCookieBanner();

const CookieConsentBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

const cookieConsentBanner = new CookieConsentBanner();

describe('Legacy Accessibility tests', () => {
    it('a11y - should test legacy f-cookie-banner component WCAG compliance', () => {
        // Arrange
        const formattedLocale = 'en-AU';
        legacyCookieBanner.withQuery('&knob-Locale', formattedLocale);
        legacyCookieBanner.load();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test new f-cookie-banner component WCAG compliance', () => {
        // Arrange
        const formattedLocale = 'en-GB';
        cookieConsentBanner.withQuery('&knob-Locale', formattedLocale);
        cookieConsentBanner.load();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
