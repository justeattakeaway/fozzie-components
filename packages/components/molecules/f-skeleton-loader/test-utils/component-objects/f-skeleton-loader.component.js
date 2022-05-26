const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class SkeletonLoader extends Page {
    constructor () {
        super('molecule', 'skeleton-loader-component');
    }

    get component () { return $('[data-test-id="skeletonLoader"]'); }

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
