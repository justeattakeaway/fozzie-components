const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class NavigationLinks extends Page {
    constructor () {
        super('molecule', 'navigation-links-component');
    }

    get component () { return $('[data-test-id="navigationLinks"]'); }

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
