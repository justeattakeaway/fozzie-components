const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ImageTile extends Page {
    constructor () {
        super('atom', 'image-tile-component');
    }

    get component () { return $('[data-test-id="image-tile-component"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};
