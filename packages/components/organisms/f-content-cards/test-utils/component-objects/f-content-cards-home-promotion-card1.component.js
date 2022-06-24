const Page = require('@justeat/f-wdio-utils/src/base.page');

const {
    PROMOTION_CARD_1_COMPONENT,
    INNER_CONTAINER,
    HEADER,
    IMAGE,
    SUBTITLE
} = require('./f-content-cards-home-promotion.selectors');

module.exports = class HomePromotionCard1 extends Page {
    constructor () {
        super('molecule-folder', 'f-content-cards--home-promotion-card-1-component');
    }

    get component () { return $(PROMOTION_CARD_1_COMPONENT); }

    get innerContainer () { return $(INNER_CONTAINER); }

    get header () { return $(HEADER); }

    get image () { return $(IMAGE); }

    get subtitle () { return $(SUBTITLE); }

    async isInnerContainerDisplayed () {
        return this.innerContainer.isDisplayed();
    }

    async isHeaderDisplayed () {
        return this.header.isDisplayed();
    }

    async isImageDisplayed () {
        return this.image.isDisplayed();
    }

    async isSubtitleDisplayed () {
        return this.subtitle.isDisplayed();
    }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
