const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const ContentCard = require ('../../../test-utils/component-objects/f-content-card.component');
const contentCard = new ContentCard();

describe('Accessibility tests', () => {
    beforeEach(() => {
        contentCard.open();
        contentCard.waitForComponent();
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-contentCard');
    });
});
