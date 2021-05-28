const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const LegacyCookieBanner = require('../../test-utils/component-objects/f-cookieBanner-legacy.component');

const legacyCookieBanner = new LegacyCookieBanner('organism', 'cookie-banner-component');

const CookieConsentBanner = require('../../test-utils/component-objects/f-cookieConsentBanner.component');

const cookieConsentBanner = new CookieConsentBanner('organism', 'cookie-banner-component');

describe('Legacy Accessibility tests', () => {
    it('a11y - should test legacy f-cookie-banner component WCAG compliance', () => {
        // Arrange
        const formattedLocale = 'en-GB';
        legacyCookieBanner.withQuery('&knob-Locale', formattedLocale);
        const pageUrl = buildUrl(legacyCookieBanner.componentType, legacyCookieBanner.componentName, legacyCookieBanner.path);
        legacyCookieBanner.open(pageUrl);
        legacyCookieBanner.waitForComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test new f-cookie-banner component WCAG compliance', () => {
        // Arrange
        const formattedLocale = 'en-IE';
        cookieConsentBanner.withQuery('&knob-Locale', formattedLocale);
        const pageUrl = buildUrl(cookieConsentBanner.componentType, cookieConsentBanner.componentName, cookieConsentBanner.path);
        cookieConsentBanner.open(pageUrl);
        cookieConsentBanner.waitForComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
