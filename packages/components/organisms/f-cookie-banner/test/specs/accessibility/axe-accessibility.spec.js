const CookieBanner = require('../../../test-utils/component-objects/f-cookieBanner.component');
const cookieBanner = new CookieBanner();
import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        cookieBanner.open()
        cookieBanner.waitForComponent();
    });

    it('a11y - should test f-cookie-banner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
