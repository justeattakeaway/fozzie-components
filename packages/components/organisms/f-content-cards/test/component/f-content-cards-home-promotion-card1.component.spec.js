const HomePromotionCard1 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const HomePromotionCard2 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');

let card;
let card2;

describe('home promotion card 1 component tests', () => {
    beforeEach(async () => {
        card = new HomePromotionCard1();
        card2 = new HomePromotionCard2();
        await card.load();
    });

    it('should display the card', async () => {
        // Assert
        await expect(await card.isComponentDisplayed()).toBe(true);
    });

    it('should display the elements of the card', async () => {
        // Assert
        await expect(await card.isInnerContainerDisplayed()).toBe(true);
        await expect(await card.isHeaderDisplayed()).toBe(true);
        await expect(await card.isImageDisplayed()).toBe(true);
        await expect(await card.isSubtitleDisplayed()).toBe(true);
    });

    it('should display the elements of the inner card', async () => {
        // Why does this pass when the second card was not loaded?
        // Because loading card is enough to make these tests pass?
        // Or something more nefarious??!
        // Assert
        await expect(await card2.isComponentDisplayed()).toBe(true);
        await expect(await card2.isCallToActionDisplayed()).toBe(true);
        await expect(await card2.isTextDisplayed()).toBe(true);
        await expect(await card2.isTitleDisplayed()).toBe(true);
        await expect(await card2.isBackgroundImageDisplayed()).toBe(true);
    });

    it('should check that the card is clickable', async () => {
        // Assert
        await expect(await card.isComponentClickable()).toBe(true);
    });

    it('should check that the inner-card is clickable', async () => {
        // Assert
        await expect(await card2.isComponentClickable()).toBe(true);
    });
});
