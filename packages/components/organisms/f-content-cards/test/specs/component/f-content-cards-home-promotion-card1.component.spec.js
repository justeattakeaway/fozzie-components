const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const HomePromotionCard1 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card1.component');
const HomePromotionCard2 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');

const card = new HomePromotionCard1('molecule-folder', 'f-content-cards--home-promotion-card-1-component');
const card2 = new HomePromotionCard2('molecule-folder', 'f-content-cards--home-promotion-card-2-component');

describe('home promotion card 1 component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(card.componentType, card.componentName, card.path);

        card.open(pageUrl)
            .waitForComponent();
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
        expect(card2.isComponentDisplayed()).toBe(true);
        expect(card2.isCallToActionDisplayed()).toBe(true);
        expect(card2.isTextDisplayed()).toBe(true);
        expect(card2.isTitleDisplayed()).toBe(true);
        expect(card2.isBackgroundImageDisplayed()).toBe(true);
    });
});
