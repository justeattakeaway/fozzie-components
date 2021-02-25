import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import CardComponent from '../../../test-utils/component-objects/f-card.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('iframe.html?id=components-atoms--card-component');
        CardComponent.waitForCard();
    });

    it('a11y - should test f-card component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-card');
    });
});
