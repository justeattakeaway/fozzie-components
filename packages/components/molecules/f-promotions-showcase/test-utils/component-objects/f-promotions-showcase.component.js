const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-promotions-showcase-selectors');

module.exports = class PromotionsShowcase extends Page {
    get component () { return $(COMPONENT); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
