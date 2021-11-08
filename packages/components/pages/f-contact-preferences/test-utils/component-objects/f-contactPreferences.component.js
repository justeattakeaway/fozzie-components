/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ContactPreferences extends Page {
    constructor () {
        super('page', 'contact-preferences-component');
    }

    get component () {
        return $('[data-test-id="contactPreferences"]');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
