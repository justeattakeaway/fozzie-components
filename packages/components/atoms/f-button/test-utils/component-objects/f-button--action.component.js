const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ActionButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    get component () { return $('[data-test-id="action-button-component"]'); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isComponentClickable () {
        return this.component.isClickable();
    }
};
