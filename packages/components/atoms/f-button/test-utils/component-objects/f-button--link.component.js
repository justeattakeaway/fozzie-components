const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class LinkButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--link-button-component', '[data-test-id="link-button-component"]');
    }

    // Overridding base implementation
    get component () { return $('[data-test-id="link-button-component"]'); }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
