import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const FormField = require('../../../test-utils/component-objects/f-form-field.component');
const formfield = new FormField();

describe('Accessibility tests', () => {
    beforeEach(() => {
        formfield.open();
        formfield.waitForComponent();
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form-field');
    });
});
