const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-takeawaypayActivation-selectors')

module.exports = class TakeawaypayActivation extends Page {

    get component () { return $(COMPONENT); }

    load() {
        this.open();
        this.waitForComponent();
    }

    open () {
        super.openComponent('organism', 'takeawaypay-activation-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
