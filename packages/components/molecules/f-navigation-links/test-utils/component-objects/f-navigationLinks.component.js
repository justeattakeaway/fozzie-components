/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-navigationLinks-selectors');

module.exports = class NavigationLinks extends Page {
    constructor () {
        super('molecule', 'navigation-links-component');
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
