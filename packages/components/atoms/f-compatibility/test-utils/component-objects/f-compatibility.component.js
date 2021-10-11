const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-compatibility-selectors')

module.exports = class Compatibility extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('atom', 'compatibility-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
