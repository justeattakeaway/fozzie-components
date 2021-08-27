const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const HomePromotionCard2 = require('../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');

let card;

describe('home promotion card 2 component tests - @browserstack', () => {
    beforeEach(() => {
        card = new HomePromotionCard2();
        const pageUrl = buildUrl(card.componentType, card.componentName, card.path);

        card.open(pageUrl);
        card.waitForComponent();
    });

    it('should display the card', () => {
        // Assert
        expect(card.isComponentDisplayed()).toBe(true);
    });

    it('should display the elements of the card', () => {
        // Assert
        expect(card.isCallToActionDisplayed()).toBe(true);
        expect(card.isTextDisplayed()).toBe(true);
        expect(card.isTitleDisplayed()).toBe(true);
        expect(card.isBackgroundImageDisplayed()).toBe(true);
    });
});
