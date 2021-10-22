import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const PromotionsShowcase = require('../../test-utils/component-objects/f-promotionsShowcase.component');
const promotionsShowcase = new PromotionsShowcase();

describe('Accessibility tests', () => {
    beforeEach(() => {
        promotionsShowcase.open();
        promotionsShowcase.waitForComponent();
    });
    it('a11y - should test f-promotionsShowcase component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-promotionsShowcase');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
