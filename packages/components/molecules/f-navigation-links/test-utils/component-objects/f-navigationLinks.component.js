const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-navigationLinks-selectors');

module.exports = class NavigationLinks extends Page {
    get component () {
        return $(COMPONENT);
    }

    open () {
        super.openComponent('molecule', 'navigationLinks-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
