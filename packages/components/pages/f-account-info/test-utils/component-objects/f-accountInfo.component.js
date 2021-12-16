const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-accountInfo-selectors');

module.exports = class AccountInfo extends Page {
    constructor () {
        super('page', 'account-info-component');
    }

    get component () { return $(COMPONENT); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
