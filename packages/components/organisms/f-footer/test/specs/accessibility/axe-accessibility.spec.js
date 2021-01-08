import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import FooterComponent from '../../../test-utils/component-objects/f-footer.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--footer-component');
        browser.switchToFrame(0);
        FooterComponent.waitForFooter();
    });

    it('a11y - should test f-footer component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-footer');
    });
});
