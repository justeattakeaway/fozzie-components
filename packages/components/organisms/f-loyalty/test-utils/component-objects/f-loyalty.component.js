const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-loyalty-selectors');

module.exports = class Loyalty extends Page {
    constructor() {
        super('organism', 'v-loyalty-component');
    }

    get component () { return $(COMPONENT); }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
