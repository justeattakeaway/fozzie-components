const Page = require('@justeat/f-wdio-utils/src/page.object'); 
const HomePromotionCard2 = require('./f-content-cards-home-promotion-card2.component');
const homePromotionCard2 = new HomePromotionCard2();

const { 
    PROMOTION_CARD_1_COMPONENT,
    INNER_CONTAINER,
    HEADER, 
    IMAGE, 
    SUBTITLE, 
    PROMOTION_CARD_2_COMPONENT,
    CTA, 
    TEXT, 
    TITLE,
    BACKGROUND_IMAGE
} = require('./f-content-cards-home-promotion.selectors');

class HomePromotionCard1 extends Page {

    get component () { return $(PROMOTION_CARD_1_COMPONENT) }
    get innerContainer () { return $(INNER_CONTAINER) }
    get header () { return $(HEADER) }
    get image () { return $(IMAGE) }
    get subtitle () { return $(SUBTITLE) }

    open() {
        super.openComponent('molecule', 'f-content-cards--home-promotion-card-1-component');
    };

    waitForComponent(){
        super.waitForComponent(this.card1.component);
    };

    isCardDisplayed(){
        return this.card1.component.isDisplayed();
    };

    isCardInnerContainerDisplayed(){
        return this.card1.innerContainer.isDisplayed();
    };

    isCardHeaderDisplayed(){
        return this.card1.header.isDisplayed();
    };

    isCardImageDisplayed(){
        return this.card1.image.isDisplayed();
    };

    isCardSubtitleDisplayed(){
        return this.card1.subtitle.isDisplayed();
    };

    isInnerCardDisplayed(){
        return homePromotionCard2.isCardDisplayed();
    };

    isInnerCardCallToActionDisplayed(){
        return homePromotionCard2.isCardCallToActionDisplayed();
    }; 

    isInnerCardTextDisplayed(){
        return homePromotionCard2.isCardTextDisplayed();
    }; 

    isInnerCardTitleDisplayed(){
        return homePromotionCard2.isCardTitleDisplayed();
    }; 

    isInnerCardBackgroundImageDisplayed(){
        return homePromotionCard2.isCardBackgroundImageDisplayed();
    }; 
};

module.exports = HomePromotionCard1;
