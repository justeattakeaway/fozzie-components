const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class MegaModal extends Page {
    constructor () {
        super('molecule', 'mega-modal-component');
    }

    get megaModalTitle () { return $('[data-test-id="mega-modal-title"]'); }
    get megaModalContent () { return $('[data-test-id="mega-modal-content"]'); }

    async isTitleDisplayed () {
        return this.megaModalTitle.isDisplayed();
    }

    async isContentDisplayed () {
        return this.megaModalTitle.isDisplayed();
    }
};
