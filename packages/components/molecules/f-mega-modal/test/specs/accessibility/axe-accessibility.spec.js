import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { MOLECULES } from '../../../../../../../url.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${MOLECULES}mega-modal-component`);
    });

    it('a11y - should test f-mega-modal component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mega-modal');
    });
});
