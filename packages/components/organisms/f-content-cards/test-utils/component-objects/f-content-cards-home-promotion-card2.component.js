import Page from '@justeat/f-wdio-utils';
import {
    PROMOTION_CARD_2_COMPONENT,
    CTA,
    TEXT,
    TITLE,
    BACKGROUND_IMAGE
} from './f-content-cards-home-promotion.selectors';

class HomePromotionCard2 extends Page {
    constructor () {
        super('molecule-folder', 'f-content-cards--home-promotion-card-2-component');
    }

    get component () { return $(PROMOTION_CARD_2_COMPONENT); }

    get callToAction () { return $(CTA); }

    get text () { return $(TEXT); }

    get cardTitle () { return $(TITLE); }

    get backgroundImage () { return $(BACKGROUND_IMAGE); }

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

    isComponentClickable () {
        return this.component.isClickable();
    }
}

export default new HomePromotionCard2();
