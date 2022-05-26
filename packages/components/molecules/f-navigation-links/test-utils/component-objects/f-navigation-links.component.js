const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class NavigationLinks extends Page {
    constructor () {
        super('molecule', 'navigation-links-component');
    }

    get component () { return $('[data-test-id="navigationLinks"]'); }

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
