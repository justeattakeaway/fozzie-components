const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class IconButton extends Page {
    constructor () {
        super('atom-folder', 'f-button--icon-button-component');
    }

    get component () { return $('[data-test-id="action-button-component"]'); }

    load () {
        super.load(this.component);
    }

    waitForIconComponent () {
        super.waitForComponent(this.component);
    }

    isIconComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isIconComponentClickable () {
        return this.component.isClickable();
    }
};
