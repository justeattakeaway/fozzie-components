import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ORGANISMS } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ORGANISMS}registration-component`);
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-registration');
    });
});
