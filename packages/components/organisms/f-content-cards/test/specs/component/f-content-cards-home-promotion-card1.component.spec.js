const HomePromotionCard1 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const card = new HomePromotionCard1();

describe('home promotion card 1 component tests', () => {
    beforeEach(() => {
        card.open();
        card.waitForComponent();
    });

    it('should display the card', () => {
        // Assert
        expect(card.isComponentDisplayed()).toBe(true);
    });

    it('should display the elements of the card', () => {
        // Assert
        expect(card.isInnerContainerDisplayed()).toBe(true);
        expect(card.isHeaderDisplayed()).toBe(true);
        expect(card.isImageDisplayed()).toBe(true); 
        expect(card.isSubtitleDisplayed()).toBe(true);
    });

    it('should display the elements of the inner card', () => {
        // Assert
        expect(card.isInnerCardDisplayed()).toBe(true);
        expect(card.isInnerCardCallToActionDisplayed()).toBe(true);
        expect(card.isInnerCardTextDisplayed()).toBe(true);
        expect(card.isInnerCardTitleDisplayed()).toBe(true); 
        expect(card.isInnerCardBackgroundImageDisplayed()).toBe(true);
    });
});
