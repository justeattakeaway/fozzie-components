const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class MediaElement extends Page {
    constructor () {
        super('molecule', 'media-element-component');
    }

    get component () { return $('[data-test-id="mediaElement-component"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
