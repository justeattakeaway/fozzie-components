import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    it('a11y - should test f-statusBanner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-statusBanner');
    });
});
