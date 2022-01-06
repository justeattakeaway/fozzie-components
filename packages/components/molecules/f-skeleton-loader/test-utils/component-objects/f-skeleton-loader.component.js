const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class SkeletonLoader extends Page {
    constructor () {
        super('molecule', 'skeleton-loader-component');
    }

    get component () { return $('[data-test-id="skeletonLoader"]'); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
