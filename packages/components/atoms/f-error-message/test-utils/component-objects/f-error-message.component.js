const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ErrorMessage extends Page {
    constructor () {
        super('atom', 'error-message-component');
    }

    get component () { return $('[data-test-id="error-message-component"]'); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
