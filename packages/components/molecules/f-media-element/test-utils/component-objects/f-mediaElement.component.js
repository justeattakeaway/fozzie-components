const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class MediaElement extends Page {
    get component () { return $('[data-test-id="mediaElement-component"]'); }

    open () {
        super.openComponent('molecule', 'media-element-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
