import HomePromotionCard from '../../test-utils/component-objects/f-content-cards-home-promotion-card1.component';

describe('home promotion card 1 component tests', () => {
    beforeEach(async () => {
        await HomePromotionCard.load();
    });

    it('should display the card', async () => {
        // Assert
        await expect(await HomePromotionCard.isComponentDisplayed()).toBe(true);
    });

    it('should display the elements of the card', async () => {
        // Assert
        await expect(await HomePromotionCard.isInnerContainerDisplayed()).toBe(true);
        await expect(await HomePromotionCard.isHeaderDisplayed()).toBe(true);
        await expect(await HomePromotionCard.isImageDisplayed()).toBe(true);
        await expect(await HomePromotionCard.isSubtitleDisplayed()).toBe(true);
    });

    it('should check that the card is clickable', async () => {
        // Assert
        await expect(await HomePromotionCard.isComponentClickable()).toBe(true);
    });
});
