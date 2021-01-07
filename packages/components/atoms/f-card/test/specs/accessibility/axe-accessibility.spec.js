import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import CardComponent from '../../../test-utils/component-objects/f-card.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-atoms--card-component');
        browser.switchToFrame(0);
        CardComponent.waitForCard();
    });

    it('a11y - should test f-formField component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-card');
    });
});
