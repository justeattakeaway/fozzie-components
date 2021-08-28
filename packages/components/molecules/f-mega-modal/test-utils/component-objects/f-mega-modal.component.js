const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

module.exports = class MegaModal extends Page {
    constructor() {
        super('molecule', 'mega-modal-component');
    }

    get component () { return $('[data-test-id="mega-modal-component"]'); }
    get megaModalTitle () { return $('[data-test-id="mega-modal-title"]'); }
    get megaModalContent () { return $('[data-test-id="mega-modal-content"]'); }

    load () {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        this.open(pageUrl);
        this.waitForComponent();
    }

    open (url) {
        super.open(url);
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
