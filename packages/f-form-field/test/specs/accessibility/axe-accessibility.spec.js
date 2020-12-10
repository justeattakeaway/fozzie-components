import { getAccessibilityTestResults, processResults } from '../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    it.skip('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form-field');
        //Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
