const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Breadcrumbs extends Page {
    constructor () {
        super('molecule', 'breadcrumbs-component');
    }

    get component () { return $('[data-test-id="breadcrumbs-component"]'); }

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
