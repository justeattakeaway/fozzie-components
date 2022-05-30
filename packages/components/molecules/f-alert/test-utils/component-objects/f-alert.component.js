const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Alert extends Page {
    constructor () {
        super('molecule', 'alert-component');
    }

    get component () { return $('[data-test-id="alert-component"]'); }

    get exitButton () { return $('[data-test-id="alert-dismiss"]'); }

    async load () {
        await super.load(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async waitForComponent () {
        await super.waitForComponent(this.component, 1000);
    }

    async clickExitButton () {
        await this.exitButton.click();
    }
};
