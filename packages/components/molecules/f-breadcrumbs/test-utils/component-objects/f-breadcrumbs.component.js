const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Breadcrumbs extends Page {
    get component () { return $('[data-test-id="breadcrumbs-component"]'); }

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
