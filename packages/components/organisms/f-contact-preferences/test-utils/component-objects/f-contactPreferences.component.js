/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-contactPreferences-selectors');

module.exports = class ContactPreferences extends Page {
    get component () {
        return $(COMPONENT);
    }

    open () {
        super.openComponent('organism', 'contactPreferences-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
