const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class MegaModal extends Page {
    get component () { return $('[data-test-id="mega-modal-component"]'); }
    get megaModalTitle () { return $('[data-test-id="mega-modal-title"]'); }
    get megaModalContent () { return $('[data-test-id="mega-modal-content"]'); }

    open () {
        super.openComponent('molecule', 'mega-modal-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isTitleDisplayed () {
        return this.megaModalTitle.isDisplayed();
    }

    isContentDisplayed () {
        return this.megaModalTitle.isDisplayed();
    }

};
