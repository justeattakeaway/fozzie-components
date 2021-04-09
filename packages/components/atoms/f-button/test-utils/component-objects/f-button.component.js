const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Buttons extends Page {
    get actionComponent () { return $('[data-test-id="action-button-component"]'); }

    get linkComponent () { return $('[data-test-id="link-button-component"]'); }

    open (url) {
        super.open(url);
    }

    waitForActionComponent () {
        this.actionComponent.waitForComponent();
    }

    waitForLinkComponent () {
        this.linkComponent.waitForExist();
    }

    isActionComponentDisplayed () {
        return this.actionComponent.isDisplayed();
    }

    isLinkComponentDisplayed () {
        return this.linkComponent.isDisplayed();
    }
};
