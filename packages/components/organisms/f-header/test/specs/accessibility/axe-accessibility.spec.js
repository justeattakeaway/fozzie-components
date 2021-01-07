import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import HeaderComponent from '../../../test-utils/component-objects/f-header.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--header-component');
        browser.switchToFrame(0);
        HeaderComponent.waitForHeader();
    });

    it('a11y - should test f-header component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-header');
    });
});
