import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import FormFieldComponent from '../../../test-utils/component-objects/f-form-field.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-atoms--form-field-component');
        browser.switchToFrame(0);
        FormFieldComponent.waitForFormField();
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form-field');
    });
});
