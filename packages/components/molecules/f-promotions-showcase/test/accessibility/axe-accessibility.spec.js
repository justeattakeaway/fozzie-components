import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const PromotionsShowcase = require('../../test-utils/component-objects/f-promotions-showcase.component');

const promotionsShowcase = new PromotionsShowcase();

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await promotionsShowcase.load();
    });
    it('a11y - should test f-promotions-showcase component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-promotions-showcase');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
