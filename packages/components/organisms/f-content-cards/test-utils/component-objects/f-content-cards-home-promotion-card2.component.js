const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    PROMOTION_CARD_2_COMPONENT,
    CTA,
    TEXT,
    TITLE,
    BACKGROUND_IMAGE
} = require('./f-content-cards-home-promotion.selectors');

module.exports = class HomePromotionCard2 extends Page {
    constructor() {
        super('molecule-folder', 'f-content-cards--home-promotion-card-2-component');
    }

    get component () { return $(PROMOTION_CARD_2_COMPONENT); }

    get callToAction () { return $(CTA); }

    get text () { return $(TEXT); }

    get cardTitle () { return $(TITLE); }

    get backgroundImage () { return $(BACKGROUND_IMAGE); }

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

    isCallToActionDisplayed () {
        return this.callToAction.isDisplayed();
    }

    isTextDisplayed () {
        return this.text.isDisplayed();
    }

    isTitleDisplayed () {
        return this.cardTitle.isDisplayed();
    }

    isBackgroundImageDisplayed () {
        return this.backgroundImage.isDisplayed();
    }
};
