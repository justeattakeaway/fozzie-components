const Page = require('@justeat/f-wdio-utils/src/page.object');

const {
    PROMOTION_CARD_1_COMPONENT,
    INNER_CONTAINER,
    HEADER,
    IMAGE,
    SUBTITLE
} = require('./f-content-cards-home-promotion.selectors');

module.exports = class HomePromotionCard1 extends Page {
    constructor() {
        super('molecule-folder', 'f-content-cards--home-promotion-card-1-component');
    }

    get component () { return $(PROMOTION_CARD_1_COMPONENT); }

    get innerContainer () { return $(INNER_CONTAINER); }

    get header () { return $(HEADER); }

    get image () { return $(IMAGE); }

    get subtitle () { return $(SUBTITLE); }

    load () {
        super.load(this.component);
    }

    open (url) {
        super.open(url);
    }

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
};
