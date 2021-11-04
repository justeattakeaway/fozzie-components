const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class LinkButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--link-button-component');
    }

    get linkComponent () { return $('[data-test-id="link-button-component"]'); }

    open (url) {
        super.open(url);
    }

    load () {
        super.load(this.linkComponent);
    }

    /**
     * @description
     * Sets the data for the button component.
     *
     * @param {Object} button
     * @param {String} button.type
     * @param {String} button.size
     */

    waitForLinkComponent () {
        super.waitForComponent(this.linkComponent);
    }

    isLinkComponentDisplayed () {
        return this.linkComponent.isDisplayed();
    }
};
