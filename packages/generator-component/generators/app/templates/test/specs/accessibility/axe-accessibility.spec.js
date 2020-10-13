import { getAccessibilityTestResults, processResults } from '../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8081');
    });

    it('a11y - should test f-<%= name.class %> component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults();

        // Assert
        if (axeResults.violations.length > 0) {
            // only create artifact if there are accessibility errors to show
            processResults(axeResults, 'f-<%= name.class %>'); 
        }
        // We want the build to fail if there are accessibility violations
        expect(axeResults.violations.length).toBe(0);
    });
});
