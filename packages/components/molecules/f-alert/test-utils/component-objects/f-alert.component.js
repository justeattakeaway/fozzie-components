const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Alert extends Page {
    constructor () {
        super('molecule', 'alert-component');
    }

    get exitButton () { return $('[data-test-id="alert-dismiss"]'); }

    get alertComponent () { return $('[data-test-id="alert-component"]'); }

    async alertRootComponent () {
        return this.alertComponent;
    }

    async clickExitButton () {
        await this.exitButton.click();
    }
};
