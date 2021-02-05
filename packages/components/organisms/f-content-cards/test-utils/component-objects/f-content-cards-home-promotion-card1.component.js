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

    // constructor() {
    //     super();
    //     this.homePromotionCard2 = new HomePromotionCard2();
    // }

    card1 = {
        get component () { return $(PROMOTION_CARD_1_COMPONENT) },
        get innerContainer () { return $(INNER_CONTAINER) }, 
        get header () { return $(HEADER) }, 
        get image () { return $(IMAGE) },
        get subtitle () { return $(SUBTITLE) }
    };

    // card2 = {
    //     get component () { return $(PROMOTION_CARD_2_COMPONENT) },
    //     get callToAction () { return $(CTA) },
    //     get text () { return $(TEXT) },
    //     get title () { return $(TITLE) },
    //     get backgroundImage () { return $(BACKGROUND_IMAGE) }
    // };

    open() {
        super.openComponent('molecule', 'f-content-cards--home-promotion-card-1-component');
    };

    waitForComponents(){
        super.waitForComponent(this.card1.component);
        super.waitForComponent(this.card2.component);
    };

    isCard1Displayed(){
        return this.card1.component.isDisplayed();
    };

    isCard1InnerContainerDisplayed(){
        return this.card1.innerContainer.isDisplayed();
    };

    isCard1HeaderDisplayed(){
        return this.card1.header.isDisplayed();
    };

    isCard1ImageDisplayed(){
        return this.card1.image.isDisplayed();
    };

    isCard1SubtitleDisplayed(){
        return this.card1.subtitle.isDisplayed();
    };

    isCard2Displayed(){
        return homePromotionCard2.isCardDisplayed();
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
};

module.exports = HomePromotionCard1;
