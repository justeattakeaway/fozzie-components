const HomePromotionCard2 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');
const card = new HomePromotionCard2();

describe('home promotion card 2 component tests', () => {
    beforeEach(() => {
        card.open();
        card.waitForComponent();
    });

    it('should display home promotion card', () => {
        // Assert
        expect(card.isCardDisplayed()).toBe(true);
    });

    it('should display the elements of the card', () => {
        // Assert
        expect(card.isCardCallToActionDisplayed()).toBe(true);
        expect(card.isCardTextDisplayed()).toBe(true);
        expect(card.isCardTitleDisplayed()).toBe(true); 
        expect(card.isCardBackgroundImageDisplayed()).toBe(true);
    });
});
