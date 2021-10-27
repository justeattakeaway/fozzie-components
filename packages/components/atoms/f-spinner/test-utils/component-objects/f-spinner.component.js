const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-spinner-selectors');

module.exports = class Spinner extends Page {
    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('atom', 'spinner-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
