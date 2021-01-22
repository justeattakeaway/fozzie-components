import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { MOLECULES } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${MOLECULES}alert-component`);
    });

    it('a11y - should test f-alert component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-alert');
    });
});
