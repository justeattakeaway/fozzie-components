const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ErrorMessage extends Page {
    constructor () {
        super('atom', 'error-message-component');
    }

    get component () { return $('[data-test-id="error-message-component"]'); }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
