const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class IconButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--icon-button-component');
    }

    get component () { return $('[data-test-id="action-button-component"]'); }

    // async load () {
    //     await super.load(this.component);
    // }

    // async waitForComponent () {
    //     await super.waitForComponent(this.component);
    // }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
