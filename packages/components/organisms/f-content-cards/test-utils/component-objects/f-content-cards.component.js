const Page = require('@justeat/f-wdio-utils/src/page.object'); 
const { 
    CONTENT_CARDS_COMPONENT,
    INNER_CONTAINER 
} = require('./f-content-cards.selectors');

class ContentCard extends Page {

    get component () { return $(CONTENT_CARDS_COMPONENT) }
    get innerContainer () { return $(INNER_CONTAINER) }

    open() {
        super.openComponent('molecule', 'f-content-cards--home-promotion-card-1-component');
    };

    waitForComponent(){
        super.waitForComponent(this.component);
    };

    isContentCardDisplayed(){
        return this.component.isDisplayed();
    };

    isInnerContainerDisplayed(){
        return this.innerContainer.isDisplayed();
    }
}

module.exports = ContentCard;