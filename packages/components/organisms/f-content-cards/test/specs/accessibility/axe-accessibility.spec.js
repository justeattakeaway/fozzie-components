const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const HomePromotionCard1 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const card = new HomePromotionCard1();

describe('Accessibility tests', () => {
    beforeEach(() => {
        card.open();
        card.waitForComponent();
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-contentCard');
    });
});
