const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const HomePromotionCard1 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const HomePromotionCard2 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');
const card1 = new HomePromotionCard1();
const card2 = new HomePromotionCard2();

describe('Accessibility tests', () => {

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        card1.open();
        card1.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-contentCard-homePromotion-1');
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        card2.open();
        card2.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-contentCard-homePromotion-2');
    });
});
