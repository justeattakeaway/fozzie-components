const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const HomePromotionCard2 = require('../../../test-utils/component-objects/f-content-cards-home-promotion-card2.component');

const card = new HomePromotionCard2('molecule-folder', 'f-content-cards--home-promotion-card-2-component');

describe('home promotion card 2 component tests', () => {
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
        expect(card.isCallToActionDisplayed()).toBe(true);
        expect(card.isTextDisplayed()).toBe(true);
        expect(card.isTitleDisplayed()).toBe(true);
        expect(card.isBackgroundImageDisplayed()).toBe(true);
    });
});
