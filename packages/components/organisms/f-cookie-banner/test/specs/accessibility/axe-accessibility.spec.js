import { getAccessibilityTestResults } from '../../../../../test/utils/axe-helper';

xdescribe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    });

    it('a11y - should test f-cookieBanner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-cookieBanner');
        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
