const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-offers-selectors')

module.exports = class Offers extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('organism', 'offers-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
