import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const LegacyCookieBanner = require('../../../test-utils/component-objects/f-cookieBanner-legacy.component');
const legacyCookieBanner = new LegacyCookieBanner();
const NewCookieBanner = require('../../../test-utils/component-objects/f-cookieBanner-new.component');
const newCookieBanner = new NewCookieBanner();

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
        newCookieBanner.open();
        newCookieBanner.waitForComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
