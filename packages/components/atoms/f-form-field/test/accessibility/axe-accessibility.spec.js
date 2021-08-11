const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const FormField = require('../../test-utils/component-objects/f-form-field.component');

const formfield = new FormField('atom-folder', 'f-form-field--form-field-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(formfield.componentType, formfield.componentName, formfield.path);
        formfield.open(pageUrl);
        formfield.waitForComponent();
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form-field');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
