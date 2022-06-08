const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Alert extends Page {
    constructor () {
        super('molecule', 'alert-component');
    }

    get exitButton () { return $('[data-test-id="alert-dismiss"]'); }

    async clickExitButton () {
        await this.exitButton.click();
    }
};
