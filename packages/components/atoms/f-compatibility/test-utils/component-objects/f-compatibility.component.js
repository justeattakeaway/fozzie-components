const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Compatibility extends Page {
    constructor() {
        super('atom', 'v-compatibility-component');
    }

    load () {
        super.load(this.component);
    }

    get component () { return $('[data-test-id="compatibility"]'); }

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
