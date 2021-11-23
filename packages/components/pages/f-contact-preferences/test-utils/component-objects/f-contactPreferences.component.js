/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    COMPONENT,
    ERROR_PAGE,
    SUBMIT_BUTTON,
    CHECKBOXES
} = require('./selectors');

module.exports = class ContactPreferences extends Page {
    constructor () {
        super('page', 'contact-preferences-component');
    }

    get component () { return $(COMPONENT); }

    get errorPage () { return $(ERROR_PAGE); }

    get submitButton () { return $(SUBMIT_BUTTON); }

    get newsEmailPreference () { return $(CHECKBOXES.news.email); }

    get newsSmsPreference () { return $(CHECKBOXES.news.sms); }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isErrorPageDisplayed () {
        return this.errorPage.isDisplayed();
    }

    clickSubmitButton () {
        return this.submitButton.click();
    }

    clickNewsEmailCheckbox () {
        return this.newsEmailPreference.click();
    }

    clickNewsSmsCheckbox () {
        return this.newsSmsPreference.click();
    }
};
