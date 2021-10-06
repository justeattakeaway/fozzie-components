const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-link-selectors')

module.exports = class Link extends Page {

    get component () { return $(COMPONENT); }

    load () {
        this.open();
        this.waitForComponent();
    }

    open () {
        super.openComponent('atom', 'v-link-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
