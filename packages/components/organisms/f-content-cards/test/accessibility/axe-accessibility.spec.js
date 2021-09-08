const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const HomePromotionCard1 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const HomePromotionCard2 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');


let card1;
let card2;

describe('Accessibility tests', () => {
    beforeEach(() => {
        card1 = new HomePromotionCard1();
        card2 = new HomePromotionCard2();
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        const pageUrl = buildUrl(card1.componentType, card1.componentName, card1.path);
        card1.open(pageUrl);
        const axeResults = getAccessibilityTestResults('f-contentCard-homePromotion-1');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        const pageUrl = buildUrl(card2.componentType, card2.componentName, card2.path);
        card2.open(pageUrl);
        const axeResults = getAccessibilityTestResults('f-contentCard-homePromotion-2');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
