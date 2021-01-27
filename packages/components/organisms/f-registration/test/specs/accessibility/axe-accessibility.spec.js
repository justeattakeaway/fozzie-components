import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import Registration from '../../../test-utils/component-objects/f-registration.component';
const registration = new Registration();

describe('Accessibility tests', () => {
    beforeEach(() => {
        registration.open();
        registration.waitForComponent();
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-registration');
    });
});
