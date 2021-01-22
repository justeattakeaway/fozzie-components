import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { MOLECULES } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${MOLECULES}searchbox-component`);
    });
    it('a11y - should test f-searchbox component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-searchbox');
    });
});
