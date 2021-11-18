const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-accountInfo-selectors');

module.exports = class AccountInfo extends Page {
    constructor () {
        super('page', 'account-info-component');
    }

    // eslint-disable-next-line class-methods-use-this
    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

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
