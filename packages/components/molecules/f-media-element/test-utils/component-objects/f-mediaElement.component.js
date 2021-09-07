const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class MediaElement extends Page {
    constructor(){
        super('molecule', 'media-element-component');
    }

    get component () { return $('[data-test-id="mediaElement-component"]'); }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
