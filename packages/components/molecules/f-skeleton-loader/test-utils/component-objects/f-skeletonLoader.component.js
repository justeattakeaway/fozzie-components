const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { COMPONENT } = require('./f-skeletonLoader-selectors');

module.exports = class SkeletonLoader extends Page {
    constructor() {
        super('molecule', 'skeleton-loader-component');
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
