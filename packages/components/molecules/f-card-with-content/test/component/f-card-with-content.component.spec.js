const CardWithContent = require('../../test-utils/component-objects/f-card-with-content.component');

const cardWithContent = new CardWithContent();

describe('f-card-with-content component tests', () => {
    beforeEach(() => {
        cardWithContent.load();
    });

    it('should display the f-card-with-content component', () => {
        // Assert
        expect(cardWithContent.isComponentDisplayed()).toBe(true);
    });
});
