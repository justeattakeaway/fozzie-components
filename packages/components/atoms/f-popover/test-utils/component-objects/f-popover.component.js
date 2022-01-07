const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Popover extends Page {
    constructor () {
        super('atom', 'popover-component');
    }

    get component () { return $('[data-test-id="popover"]'); }

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
