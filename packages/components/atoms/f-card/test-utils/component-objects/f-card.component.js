const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Card extends Page {
    constructor () {
        super('atom', 'card-component');
    }

    get component () { return $('[data-test-id="card-component"]'); }

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
