import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Form = require('../../test-utils/component-objects/f-form.component');

const form = new Form();

describe('Accessibility tests', () => {
    beforeEach(() => {
        form.load();
    });

    it('a11y - should test f-form component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
