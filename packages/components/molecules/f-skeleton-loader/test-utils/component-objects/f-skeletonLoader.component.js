const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-skeletonLoader-selectors');

module.exports = class SkeletonLoader extends Page {
    constructor() {
        super('molecule', 'skeleton-loader-component');
    }

    get component () { return $(COMPONENT); }

    load () {
        super.load(this.component);
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
