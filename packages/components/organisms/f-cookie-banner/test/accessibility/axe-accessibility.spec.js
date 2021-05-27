import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

import legacyCookieBanner from '../../test-utils/component-objects/f-cookieBanner-legacy.component';
import cookieConsentBanner from  '../../test-utils/component-objects/f-cookieConsentBanner.component';

describe('Legacy Accessibility tests', () => {
    it('a11y - should test legacy f-cookie-banner component WCAG compliance', () => {
        // Arrange
        legacyCookieBanner.open();
        legacyCookieBanner.waitForComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test new f-cookie-banner component WCAG compliance', () => {
        // Arrange
        cookieConsentBanner.open();
        cookieConsentBanner.waitForComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
