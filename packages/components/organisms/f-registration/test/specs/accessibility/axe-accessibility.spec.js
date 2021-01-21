import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import RegistrationComponent from '../../../test-utils/component-objects/f-registration.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('/iframe.html?id=components-organisms--registration-component');
        RegistrationComponent.waitForRegistrationForm();
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-registration');
    });
});
