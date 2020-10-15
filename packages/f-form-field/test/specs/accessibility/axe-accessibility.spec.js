import { getAccessibilityTestResults, processResults } from '../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form-field');

        // // Assert
        // if (axeResults.violations.length > 0) {
        //     // only create artifact if there are accessibility errors to show
        //     processResults(axeResults, 'f-formField'); 
        // }
        // We want the build to fail if there are accessibility violations
        expect(axeResults.violations.length).toBe(0);
    });
});
