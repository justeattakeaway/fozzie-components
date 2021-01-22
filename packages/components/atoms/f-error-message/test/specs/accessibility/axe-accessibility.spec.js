import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ATOMS } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ATOMS}error-message-component`);
    });

    it('a11y - should test f-error-message component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-error-message');
    });
});
