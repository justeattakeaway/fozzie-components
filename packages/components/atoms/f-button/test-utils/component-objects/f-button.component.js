const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class Button extends Page {
    get component () { return $('[data-test-id="action-button-component"]'); }

    open () {
        super.openComponent('atom', 'button-component');
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
