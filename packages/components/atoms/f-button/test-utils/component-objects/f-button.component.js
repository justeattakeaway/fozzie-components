const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Button extends Page {
    constructor () {
        super('atom-folder', 'f-button--button-component');
    }

    get actionComponent () { return $('[data-test-id="action-button-component"]'); }

    open (url) {
        super.open(url);
    }

    load () {
        super.load(this.actionComponent);
    }

    /**
     * @description
     * Sets the data for the button component.
     *
     * @param {Object} button
     * @param {String} button.type
     * @param {String} button.size
     */

    waitForActionComponent () {
        super.waitForComponent(this.actionComponent);
    }

    isActionComponentDisplayed () {
        return this.actionComponent.isDisplayed();
    }
};
