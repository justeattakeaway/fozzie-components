const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-link-selectors')

module.exports = class Link extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('atom', 'link-component');
    }

    waitForTestComponent () 
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
