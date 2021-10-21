const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class SearchBox extends Page {
    constructor(){
        super('molecule', 'searchbox-component');
    }

    get component () { return $('[data-test-id="searchbox-component"]'); }

    load () {
        super.load(this.component);
    }

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
