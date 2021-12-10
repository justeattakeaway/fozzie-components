const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Button extends Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    get component () { return $('[data-test-id="action-button-component"]'); }

    load () {
        super.load(this.component);
    }

    waitForActionComponent () {
        super.waitForComponent(this.component);
    }

    isActionComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
