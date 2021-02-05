const HomePromotionCard1 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const card = new HomePromotionCard1();

describe('home promotion card 1 component tests', () => {
    beforeEach(() => {
        card.open();
        card.waitForComponents();
    });

    it('should display cards 1 and 2', () => {
        // Assert
        expect(card.isCard1Displayed()).toBe(true);
        expect(card.isCard2Displayed()).toBe(true);
    });

    it('should display the elements of card 1', () => {
        // Assert
        expect(card.isCard1InnerContainerDisplayed()).toBe(true);
        expect(card.isCard1HeaderDisplayed()).toBe(true);
        expect(card.isCard1ImageDisplayed()).toBe(true); 
        expect(card.isCard1SubtitleDisplayed()).toBe(true);
    });

    it('should display the elements of card 2', () => {
        // Assert
        expect(card.isCard2CallToActionDisplayed()).toBe(true);
        expect(card.isCard2TextDisplayed()).toBe(true);
        expect(card.isCard2TitleDisplayed()).toBe(true); 
        expect(card.isCard2BackgroundImageDisplayed()).toBe(true);
    });
});
