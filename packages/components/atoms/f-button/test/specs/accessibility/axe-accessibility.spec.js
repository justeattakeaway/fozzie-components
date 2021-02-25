import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import ButtonComponent from '../../../test-utils/component-objects/f-button.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('iframe.html?id=components-atoms--button-component');
        ButtonComponent.waitForButtonComponent();
    });

    it('a11y - should test f-button component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-button');
    });
});
