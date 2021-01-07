import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import MegaModalComponent from '../../../test-utils/component-objects/f-mega-modal.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-molecules--mega-modal-component');
        browser.switchToFrame(0);
        MegaModalComponent.waitForMegaModal();
    });

    it('a11y - should test f-alert component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mega-modal');
        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
