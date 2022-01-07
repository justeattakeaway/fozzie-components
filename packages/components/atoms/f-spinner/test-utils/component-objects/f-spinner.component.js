const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Spinner extends Page {
    constructor () {
        super('atom', 'v-spinner-component');
    }

    get component () { return $('[data-test-id="spinner-component"]'); }

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
