const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-skeletonLoader-selectors');

module.exports = class SkeletonLoader extends Page {
    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('molecule', 'skeleton-loader-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
