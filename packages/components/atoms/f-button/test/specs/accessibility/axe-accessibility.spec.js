import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import ButtonComponent from '../../../test-utils/component-objects/f-button.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-atoms--button-component');
        browser.switchToFrame(0);
        ButtonComponent.waitForButtonComponent();
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-button');
        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
