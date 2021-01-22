import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ATOMS } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ATOMS}form-field-component`);
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-form-field');
    });
});
