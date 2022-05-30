const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ErrorMessage extends Page {
    constructor () {
        super('atom', 'error-message-component');
    }

    get component () { return $('[data-test-id="error-message-component"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
