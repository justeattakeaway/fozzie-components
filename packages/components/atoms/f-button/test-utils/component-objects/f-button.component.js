const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Buttons extends Page {
    get actionComponent () { return $('[data-test-id="action-button-component"]'); }

    get linkComponent () { return $('[data-test-id="link-button-component"]'); }

    open (buttonType = '') {
        const url = buttonType === 'link' ? '&knob-Button%20Type=link&knob-href=link' : '';

        browser.url(`/iframe.html?id=components-atoms-f-button--button-component${url}`)
    }

    waitForActionComponent () {
        this.actionComponent.waitForExist();
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
