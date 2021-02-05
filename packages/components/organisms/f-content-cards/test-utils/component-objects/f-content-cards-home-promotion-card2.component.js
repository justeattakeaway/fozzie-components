const Page = require('@justeat/f-wdio-utils/src/page.object'); 
const { 
    PROMOTION_CARD_2_COMPONENT,
    CTA, 
    TEXT, 
    TITLE,
    BACKGROUND_IMAGE
} = require('./f-content-cards-home-promotion.selectors');

class HomePromotionCard2 extends Page {

    card2 = {
        get component () { return $(PROMOTION_CARD_2_COMPONENT) },
        get callToAction () { return $(CTA) },
        get text () { return $(TEXT) },
        get title () { return $(TITLE) },
        get backgroundImage () { return $(BACKGROUND_IMAGE) }
    }

    open() {
        super.openComponent('molecule', 'f-content-cards--home-promotion-card-2-component');
    };

    waitForComponent(){
        super.waitForComponent(this.card2.component);
    };

    isCard2Displayed(){
        return this.card2.component.isDisplayed();
    };

    isCard2CallToActionDisplayed(){
        return this.card2.callToAction.isDisplayed();
    }; 

    isCard2TextDisplayed(){
        return this.card2.text.isDisplayed();
    }; 

    isCard2TitleDisplayed(){
        return this.card2.title.isDisplayed();
    }; 

    isCard2BackgroundImageDisplayed(){
        return this.card2.backgroundImage.isDisplayed();
    }; 
}

module.exports = HomePromotionCard2;
