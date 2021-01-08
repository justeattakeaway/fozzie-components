import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import RegistrationComponent from '../../../test-utils/component-objects/f-registration.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--registration-component');
        browser.switchToFrame(0);
        RegistrationComponent.waitForRegistrationForm();
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-registration');
    });
});
