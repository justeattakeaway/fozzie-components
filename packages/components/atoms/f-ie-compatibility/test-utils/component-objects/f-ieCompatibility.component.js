const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-ieCompatibility-selectors')

module.exports = class IeCompatibility extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('atom', 'ieCompatibility-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
