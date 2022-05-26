const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class PromotionsShowcase extends Page {
    constructor () {
        super('molecule', 'promotions-showcase-component');
    }

    get component () { return $('[data-test-id="promotionsShowcase"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
