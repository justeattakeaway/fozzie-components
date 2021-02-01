import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    it('a11y - should test f-mediaElement component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mediaElement');
    });
});
