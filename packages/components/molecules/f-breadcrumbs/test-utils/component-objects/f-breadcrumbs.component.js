const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Breadcrumbs extends Page {
    constructor () {
        super('molecule', 'breadcrumbs-component');
    }

    get component () { return $('[data-test-id="breadcrumbs-component"]'); }

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
