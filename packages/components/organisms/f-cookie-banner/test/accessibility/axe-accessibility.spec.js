const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const LegacyCookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

const legacyCookieBanner = new LegacyCookieBanner();

const CookieConsentBanner = require('../../test-utils/component-objects/f-cookie-consent-banner.component');

const cookieConsentBanner = new CookieConsentBanner();

describe('Legacy Accessibility tests', () => {
    it('a11y - should test legacy f-cookie-banner component WCAG compliance', () => {
        // Arrange
        legacyCookieBanner.withQuery('args', 'locale:en-AU');

        // Act
        legacyCookieBanner.load();
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test new f-cookie-banner component WCAG compliance', () => {
        // Arrange
        legacyCookieBanner.withQuery('args', 'locale:en-GB');

        // Act
        cookieConsentBanner.load();
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
