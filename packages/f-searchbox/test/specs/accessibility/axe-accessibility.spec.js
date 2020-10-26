import { getAccessibilityTestResults } from '../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    });

    it('a11y - should test f-searchbox component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-searchbox');
        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
