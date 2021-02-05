const HomePromotionCard1 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const homePromotionCard1 = new HomePromotionCard1();
;

describe('f-content-card component tests', () => {
    beforeEach(() => {
        homePromotionCard1.open();
        homePromotionCard1.waitForComponents();
    });

    it.only('should display home promotion cards', () => {
        // Assert
        expect(homePromotionCard1.isCard1Displayed()).toBe(true);
        expect(homePromotionCard1.isCard2Displayed()).toBe(true);
    });

    // it('should display the elements of Card 1', () => {
    //     // Assert
    //     expect(homePromotionCard1.isCard1InnerContainerDisplayed()).toBe(true);
    //     expect(homePromotionCard1.isCard1HeaderDisplayed()).toBe(true);
    //     expect(homePromotionCard1.isCard1ImageDisplayed()).toBe(true); 
    //     expect(homePromotionCard1.isCard1SubtitleDisplayed()).toBe(true);
    // });

    // it('should display the elements of Card 2', () => {
    //     // Assert
    //     expect(homePromotionCard1.isCard2CallToActionDisplayed()).toBe(true);
    //     expect(homePromotionCard1.isCard2TextDisplayed()).toBe(true);
    //     expect(homePromotionCard1.isCard2TitleDisplayed()).toBe(true); 
    //     expect(homePromotionCard1.isCard2BackgroundImageDisplayed()).toBe(true);
    // });
});
