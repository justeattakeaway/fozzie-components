const Card = require('../../test-utils/component-objects/f-card.component');

const card = new Card();

describe('f-card component tests', () => {
    beforeEach(() => {
        card.load();
    });

    it('should display the f-card component', () => {
        // Assert
        expect(card.isComponentDisplayed()).toBe(true);
    });
});
