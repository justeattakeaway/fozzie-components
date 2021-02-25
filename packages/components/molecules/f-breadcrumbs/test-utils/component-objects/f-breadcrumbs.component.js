const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Breadcrumbs extends Page {
    get component () { return $('[data-test-id="breadcrumbs-component"]'); }

    open () {
        super.openComponent('molecule', 'breadcrumbs-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
