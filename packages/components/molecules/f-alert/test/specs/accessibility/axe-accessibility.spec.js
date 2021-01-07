import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import AlertComponent from '../../../test-utils/component-objects/f-alert.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-molecules--alert-component');
        browser.switchToFrame(0);
        AlertComponent.waitForAlert();
    });

    it('a11y - should test f-alert component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-alert');
    });
});
