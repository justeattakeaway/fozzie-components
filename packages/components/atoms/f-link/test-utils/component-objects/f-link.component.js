const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Link extends Page {
    constructor () {
        super('atom', 'v-link-component');
    }

    get component () { return $('[data-test-id="link-component"]'); }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
