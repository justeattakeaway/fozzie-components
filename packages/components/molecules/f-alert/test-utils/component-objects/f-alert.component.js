const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Alert extends Page {
    constructor () {
        super('molecule', 'alert-component');
    }

    get component () { return $('[data-test-id="alert-component"]'); }

    get exitButton () { return $('[data-test-id="alert-dismiss"]'); }

    load () {
        super.load(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    waitForComponent () {
        super.waitForComponent(this.component, 1000);
    }

    clickExitButton () {
        this.exitButton.click();
    }
};
