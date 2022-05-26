const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class MegaModal extends Page {
    constructor () {
        super('molecule', 'mega-modal-component');
    }

    get component () { return $('[data-test-id="mega-modal-component"]'); }
    get megaModalTitle () { return $('[data-test-id="mega-modal-title"]'); }
    get megaModalContent () { return $('[data-test-id="mega-modal-content"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isTitleDisplayed () {
        return this.megaModalTitle.isDisplayed();
    }

    async isContentDisplayed () {
        return this.megaModalTitle.isDisplayed();
    }
};
