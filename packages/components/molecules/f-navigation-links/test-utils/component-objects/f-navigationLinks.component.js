/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class NavigationLinks extends Page {
    constructor () {
        super('molecule', 'navigation-links-component');
    }

    get component () {
        return $('[data-test-id="navigationLinks"]');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
