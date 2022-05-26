const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class CardWithContent extends Page {
    constructor () {
        super('molecule', 'card-with-content-component');
    }

    get component () { return $('[data-test-id="cardWithContent"]'); }

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
