import { getAccessibilityTestResults } from '../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    it('a11y - should test f-<%= name.class %> component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-<%= name.class %>');
        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
