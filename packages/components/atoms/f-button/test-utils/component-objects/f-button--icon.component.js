const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class IconButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--icon-button-component');
    }

    // Overridding base implementation
    get component () { return $('[data-test-id="action-button-component"]'); }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
