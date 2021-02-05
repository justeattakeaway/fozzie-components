const Page = require('@justeat/f-wdio-utils/src/page.object'); 
const HomePromotionCard2 = require('./f-content-cards-home-promotion-card2.component');
const homePromotionCard2 = new HomePromotionCard2();

const { 
    PROMOTION_CARD_1_COMPONENT,
    INNER_CONTAINER,
    HEADER, 
    IMAGE, 
    SUBTITLE, 
} = require('./f-content-cards-home-promotion.selectors');

class HomePromotionCard1 extends Page {

    card1 = {
        get component () { return $(PROMOTION_CARD_1_COMPONENT) },
        get innerContainer () { return $(INNER_CONTAINER) }, 
        get header () { return $(HEADER) }, 
        get image () { return $(IMAGE) },
        get subtitle () { return $(SUBTITLE) }
    };

    card2 = {
        get component () { return $(PROMOTION_CARD_2_COMPONENT) },
        // get callToAction () { return $(HomePromotionCard2.callToAction) },
        // get text () { return $(HomePromotionCard2.text) },
        // get title () { return $(HomePromotionCard2.title) },
        // get backgroundImage () { return $(HomePromotionCard2.backgroundImage) }
    };

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
        return this.card2.component.isDisplayed();
    };

    // isCard2CallToActionDisplayed(){
    //     return homePromotionCard2.callToAction.isDisplayed();
    // }; 

    // isCard2TextDisplayed(){
    //     return homePromotionCard2.text.isDisplayed();
    // }; 

    // isCard2TitleDisplayed(){
    //     return homePromotionCard2.title.isDisplayed();
    // }; 

    // isCard2BackgroundImageDisplayed(){
    //     return homePromotionCard2.backgroundImage.isDisplayed();
    // }; 
}

module.exports = HomePromotionCard1;
