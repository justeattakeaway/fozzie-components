const Page = require('../../../../../services/f-wdio-utils/src/page.object');
const {
    PROMOTION_CARD_2_COMPONENT,
    CTA,
    TEXT,
    TITLE,
    BACKGROUND_IMAGE
} = require('./f-content-cards-home-promotion.selectors');

module.exports = class HomePromotionCard2 extends Page {

    get component () { return $(PROMOTION_CARD_2_COMPONENT) }
    get callToAction () { return $(CTA) }
    get text () { return $(TEXT) }
    get title () { return $(TITLE) }
    get backgroundImage () { return $(BACKGROUND_IMAGE) }

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
        return this.title.isDisplayed();
    }

    isBackgroundImageDisplayed () {
        return this.backgroundImage.isDisplayed();
    }
}
