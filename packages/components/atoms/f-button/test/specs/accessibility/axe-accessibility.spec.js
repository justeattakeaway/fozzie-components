import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ATOMS } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ATOMS}button-component`);
    });

    it('a11y - should test f-button component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-button');
    });
});
