const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-loyalty-selectors')

module.exports = class Loyalty extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('organism', 'loyalty-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
