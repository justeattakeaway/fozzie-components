const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-takeawayPayActivation-selectors')

module.exports = class TakeawayPayActivation extends Page {

    get component () { return $(COMPONENT); }

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
