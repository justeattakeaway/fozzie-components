const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-popover-selectors')

module.exports = class Popover extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('atom', 'popover-component');
    }

    waitForTestComponent () 
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        this.component.isDisplayed();
    }
}
