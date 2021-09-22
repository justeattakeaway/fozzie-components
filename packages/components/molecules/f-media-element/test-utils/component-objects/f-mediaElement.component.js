const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

module.exports = class MediaElement extends Page {
    constructor(){
        super('molecule', 'media-element-component');
    }

    get component () { return $('[data-test-id="mediaElement-component"]'); }

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
};
