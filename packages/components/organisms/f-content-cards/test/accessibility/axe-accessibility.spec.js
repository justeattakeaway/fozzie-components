const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const HomePromotionCard1 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const HomePromotionCard2 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');

let card1;
let card2;

describe('Accessibility tests', () => {
    beforeEach(() => {
        card1 = new HomePromotionCard1();
        card2 = new HomePromotionCard2();
    });

    it('a11y - should test f-content-card component WCAG compliance', () => {
        // Act
        card1.load();
        const axeResults = getAxeResults('f-content-card-home-promotion-1');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-content-card component WCAG compliance', () => {
        // Act
        card2.load();
        const axeResults = getAxeResults('f-content-card-home-promotion-2');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
