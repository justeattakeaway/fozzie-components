import { getAccessibilityTestResults, processResults } from '../../../../../test/utils/axe-helper';
import RegistrationComponent from '../../../test-utils/component-objects/f-registration.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8081');
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults();

        // Assert
        if (axeResults.violations.length > 0) {
            processResults(axeResults, 'f-registration');
        }
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-registration component error messages are WCAG compliance', () => {
        // Arrange
        const userInfo = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        RegistrationComponent.submitRegistrationForm(userInfo);

        // Act
        const axeResults = getAccessibilityTestResults();

        // Assert
        if (axeResults.violations.length > 0) {
            processResults(axeResults, 'f-registration');
        }
        expect(axeResults.violations.length).toBe(0);
    });
});
