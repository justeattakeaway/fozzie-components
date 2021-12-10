const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class LinkButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--link-button-component');
    }

    get component () { return $('[data-test-id="link-button-component"]'); }

    load () {
        super.load(this.component);
    }

    waitForLinkComponent () {
        super.waitForComponent(this.component);
    }

    isLinkComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
