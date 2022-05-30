const HomePromotionCard2 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');

let card;

describe('home promotion card 2 component tests', () => {
    beforeEach(async () => {
        card = new HomePromotionCard2();
        await card.load();
    });

    it('should display the card', async () => {
        // Assert
        await expect(await card.isComponentDisplayed()).toBe(true);
    });

    it('should display the elements of the card', async () => {
        // Assert
        await expect(await card.isCallToActionDisplayed()).toBe(true);
        await expect(await card.isTextDisplayed()).toBe(true);
        await expect(await card.isTitleDisplayed()).toBe(true);
        await expect(await card.isBackgroundImageDisplayed()).toBe(true);
    });

    it('should check that the card is clickable', async () => {
        // Assert
        await expect(await card.isComponentClickable()).toBe(true);
    });
});
