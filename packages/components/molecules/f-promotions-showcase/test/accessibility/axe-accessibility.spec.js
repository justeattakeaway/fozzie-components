import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const PromotionsShowcase = require('../../test-utils/component-objects/f-promotions-showcase.component');

const promotionsShowcase = new PromotionsShowcase();

describe('Accessibility tests', () => {
    beforeEach(() => {
        promotionsShowcase.load();
    });
    it('a11y - should test f-promotions-showcase component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-promotionsShowcase');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
