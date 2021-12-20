const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class CardWithContent extends Page {
    constructor () {
        super('molecule', 'card-with-content-component');
    }

    get component () { return $('[data-test-id="cardWithContent"]'); }

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
