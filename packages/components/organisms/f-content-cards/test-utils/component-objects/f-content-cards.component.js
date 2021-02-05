const Page = require('@justeat/f-wdio-utils/src/page.object'); 
const { 
    PROMOTION_CARD_1_COMPONENT,
    INNER_CONTAINER,
    HEADER, 
    LOGO, 
    SUBTITLE, 
    PROMOTION_CARD_2_COMPONENT,
    CTA, 
    TEXT, 
    TITLE,
    IMAGE
} = require('./f-content-cards.selectors');

class HomePromotion extends Page {

    card1 = {
        get component () { return $(PROMOTION_CARD_1_COMPONENT) },
        get innerContainer () { return $(INNER_CONTAINER) }, 
        get header () { return $(HEADER) }, 
        get logo () { return $(LOGO) },
        get subtitle () { return $(SUBTITLE) }
    }

    card2 = {
        get component () { return $(PROMOTION_CARD_2_COMPONENT) },
        get callToAction () { return $(CTA) },
        get text () { return $(TEXT) },
        get title () { return $(TITLE) },
        get image () { return $(IMAGE) }
    }

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

    isCard1ContainerDisplayed(){
        return this.card1.innerContainer.isDisplayed();
    };

    isCard1HeaderDisplayed(){
        return this.card1.header.isDisplayed();
    };

    isCard1LogoDisplayed(){
        return this.card1.logo.isDisplayed();
    };

    isCard1SubtitleDisplayed(){
        return this.card1.subtitle.isDisplayed();
    };

    isCard2Displayed(){
        return this.card1.component.isDisplayed();
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

    isCard2ImageDisplayed(){
        return this.card2.image.isDisplayed();
    }; 
}

module.exports = HomePromotion;