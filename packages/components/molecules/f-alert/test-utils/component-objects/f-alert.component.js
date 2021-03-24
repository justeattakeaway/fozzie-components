const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Alert extends Page {
    get component () { return $('[data-test-id="alert-component"]'); }

    get exitButton () { return $('[data-test-id="alert-dismiss"]'); }

    open (url) {
        super.open(url);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    clickExitButton () {
        this.exitButton.click();
    }
};
