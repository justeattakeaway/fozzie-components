const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { COMPONENT } = require('./f-offers-selectors');

module.exports = class Offers extends Page {
    constructor() {
        super('organism', 'v-offers-component');
    }

    get component () { return $(COMPONENT); }

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
