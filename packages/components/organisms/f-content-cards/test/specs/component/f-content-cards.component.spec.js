const ContentCard = require('../../../test-utils/component-objects/f-content-cards.component');
const contentCard = new ContentCard();

describe('f-content-card component tests', () => {
    beforeEach(() => {
        contentCard.open();
        contentCard.waitForComponent();
    });

    it('should display Content Card component', () => {
        // Assert
        expect(contentCard.isContentCardDisplayed()).toBe(true);
    });
});
