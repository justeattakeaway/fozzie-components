const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-promotionsShowcase-selectors')

module.exports = class PromotionsShowcase extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('molecule', 'promotionsShowcase-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
