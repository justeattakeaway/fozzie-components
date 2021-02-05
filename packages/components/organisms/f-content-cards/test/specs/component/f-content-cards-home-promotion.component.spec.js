const HomePromotion = require('../../../test-utils/component-objects/f-content-cards.component');
const homePromotion = new HomePromotion();

describe('f-content-card component tests', () => {
    beforeEach(() => {
        homePromotion.open();
        homePromotion.waitForComponents();
    });

    it('should display Promotion Card 1 and Promotion Card 2', () => {
        // Assert
        expect(homePromotion.isCard1Displayed()).toBe(true);
        expect(homePromotion.isCard2Displayed()).toBe(true);
    });

    it('should display the elements of Card 1', () => {
        // Assert
        expect(homePromotion.isCard1InnerContainerDisplayed()).toBe(true);
        expect(homePromotion.isCard1HeaderDisplayed()).toBe(true);
        expect(homePromotion.isCard1ImageDisplayed()).toBe(true); 
        expect(homePromotion.isCard1SubtitleDisplayed()).toBe(true);
    });

    it('should display the elements of Card 2', () => {
        // Assert
        expect(homePromotion.isCard2CallToActionDisplayed()).toBe(true);
        expect(homePromotion.isCard2TextDisplayed()).toBe(true);
        expect(homePromotion.isCard2TitleDisplayed()).toBe(true); 
        expect(homePromotion.isCard2BackgroundImageDisplayed()).toBe(true);
    });
});
