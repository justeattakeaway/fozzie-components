import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ORGANISMS } from '../../../../../../../url.selectors'

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ORGANISMS}checkout-component`);
    });

    it('a11y - should test f-checkout component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-checkout');
    });
});
