/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-spinner-selectors');

module.exports = class Spinner extends Page {
    constructor () {
        super('atom', 'spinner-component');
    }

    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
