const Page = require('../../../../../services/f-wdio-utils/src/page.object');
const HomePromotionCard2 = require('./f-content-cards-home-promotion-card2.component');
const card2 = new HomePromotionCard2();

const {
    PROMOTION_CARD_1_COMPONENT,
    INNER_CONTAINER,
    HEADER,
    IMAGE,
    SUBTITLE
} = require('./f-content-cards-home-promotion.selectors');

class HomePromotionCard1 extends Page {

    get component () { return $(PROMOTION_CARD_1_COMPONENT) }
    get innerContainer () { return $(INNER_CONTAINER) }
    get header () { return $(HEADER) }
    get image () { return $(IMAGE) }
    get subtitle () { return $(SUBTITLE) }

    open() {
        super.openComponent('molecule-folder', 'f-content-cards--home-promotion-card-1-component');
    };

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isInnerContainerDisplayed () {
        return this.innerContainer.isDisplayed();
    }

    isHeaderDisplayed () {
        return this.header.isDisplayed();
    }

    isImageDisplayed () {
        return this.image.isDisplayed();
    }

    isSubtitleDisplayed () {
        return this.subtitle.isDisplayed();
    }

    isInnerCardDisplayed () {
        return card2.isComponentDisplayed();
    }

    isInnerCardCallToActionDisplayed () {
        return card2.isCallToActionDisplayed();
    }

    isInnerCardTextDisplayed () {
        return card2.isTextDisplayed();
    }

    isInnerCardTitleDisplayed () {
        return card2.isTitleDisplayed();
    }

    isInnerCardBackgroundImageDisplayed () {
        return card2.isBackgroundImageDisplayed();
    }
}

module.exports = HomePromotionCard1;
