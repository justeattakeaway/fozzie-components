const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Popover extends Page {
    constructor () {
        super('atom', 'popover-component');
    }

    get component () { return $('[data-test-id="popover"]'); }

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
