const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-loyalty-selectors');

module.exports = class Loyalty extends Page {
    constructor () {
        super('page', 'v-loyalty-component');
    }

    get component () { return $(COMPONENT); }

    load () {
        super.load(this.component);
    }

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
