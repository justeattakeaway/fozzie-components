const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class PromotionsShowcase extends Page {
    constructor () {
        super('molecule', 'promotions-showcase-component');
    }

    get component () { return $('[data-test-id="promotionsShowcase"]'); }

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
