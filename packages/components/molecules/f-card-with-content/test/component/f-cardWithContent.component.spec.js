const CardWithContent = require('../../test-utils/component-objects/f-cardWithContent.component');

const cardWithContent = new CardWithContent();

describe('f-cardWithContent component tests', () => {
    beforeEach(() => {
        cardWithContent.load();
    });

    it('should display the f-cardWithContent component', () => {
        // Assert
        expect(cardWithContent.isComponentDisplayed()).toBe(true);
    });
});
