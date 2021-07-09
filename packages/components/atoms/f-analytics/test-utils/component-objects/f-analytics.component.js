const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-analytics-selectors');

module.exports = class Analytics extends Page {
    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('atom', 'analytics-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
