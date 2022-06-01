const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ActionButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    get component () { return $('[data-test-id="action-button-component"]'); }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
