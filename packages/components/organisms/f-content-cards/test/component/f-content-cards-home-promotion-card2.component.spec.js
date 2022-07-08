import HomePromotionCard from '../../test-utils/component-objects/f-content-cards-home-promotion-card2.component';

describe('home promotion card 2 component tests', () => {
    beforeEach(async () => {
        await HomePromotionCard.load();
    });

    it('should display the card', async () => {
        // Assert
        await expect(await HomePromotionCard.isComponentDisplayed()).toBe(true);
    });

    it('should display the elements of the card', async () => {
        // Assert
        await expect(await HomePromotionCard.isCallToActionDisplayed()).toBe(true);
        await expect(await HomePromotionCard.isTextDisplayed()).toBe(true);
        await expect(await HomePromotionCard.isTitleDisplayed()).toBe(true);
        await expect(await HomePromotionCard.isBackgroundImageDisplayed()).toBe(true);
    });

    it('should check that the card is clickable', async () => {
        // Assert
        await expect(await HomePromotionCard.isComponentClickable()).toBe(true);
    });
});
