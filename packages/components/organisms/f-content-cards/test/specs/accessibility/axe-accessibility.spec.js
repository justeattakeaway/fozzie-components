const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const HomePromotion = require('../../../test-utils/component-objects/f-content-cards.component');
const homePromotion = new HomePromotion();

describe('Accessibility tests', () => {
    beforeEach(() => {
        homePromotion.open();
        homePromotion.waitForComponents();
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-contentCard');
    });
});
