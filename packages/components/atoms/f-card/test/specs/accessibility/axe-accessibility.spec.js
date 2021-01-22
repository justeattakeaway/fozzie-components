import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ATOMS } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ATOMS}card-component`);
    });

    it('a11y - should test f-card component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-card');
    });
});
