const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class SearchBox extends Page {
    constructor () {
        super('molecule', 'searchbox-component');
    }

    get component () { return $('[data-test-id="searchbox-component"]'); }

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
