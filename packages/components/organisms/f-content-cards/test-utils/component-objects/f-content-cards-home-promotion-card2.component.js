const Page = require('@justeat/f-wdio-utils/src/page.object'); 
const { 
    PROMOTION_CARD_2_COMPONENT,
    CTA, 
    TEXT, 
    TITLE,
    BACKGROUND_IMAGE
} = require('./f-content-cards-home-promotion.selectors');

class HomePromotionCard2 extends Page {

    get component () { return $(PROMOTION_CARD_2_COMPONENT) }
    get callToAction () { return $(CTA) }
    get text () { return $(TEXT) }
    get title () { return $(TITLE) }
    get backgroundImage () { return $(BACKGROUND_IMAGE) }

    open() {
        super.openComponent('molecule', 'f-content-cards--home-promotion-card-2-component');
    };

    waitForComponent(){
        super.waitForComponent(this.card.component);
    };

    isCardDisplayed(){
        return this.component.isDisplayed();
    };

    isCardCallToActionDisplayed(){
        return this.callToAction.isDisplayed();
    }; 

    isCardTextDisplayed(){
        return this.card.text.isDisplayed();
    }; 

    isCardTitleDisplayed(){
        return this.card.title.isDisplayed();
    }; 

    isCardBackgroundImageDisplayed(){
        return this.card.backgroundImage.isDisplayed();
    }; 
};

module.exports = HomePromotionCard2;
