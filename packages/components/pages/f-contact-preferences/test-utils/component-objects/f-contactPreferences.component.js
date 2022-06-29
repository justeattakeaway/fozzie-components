const Page = require('@justeat/f-wdio-utils/src/base.page');
const {
    ERROR_PAGE,
    SUBMIT_BUTTON,
    CHECKBOXES,
    ERROR_ALERT,
    SUCCESS_ALERT
} = require('./selectors');

module.exports = class ContactPreferences extends Page {
    constructor () {
        super('page', 'contact-preferences-component');
    }

    get errorPage () { return $(ERROR_PAGE); }

    get submitButton () { return $(SUBMIT_BUTTON); }

    get newsEmailPreference () { return $(CHECKBOXES.news.email); }

    get newsSmsPreference () { return $(CHECKBOXES.news.sms); }

    get errorAlert () { return $(ERROR_ALERT); }

    get successAlert () { return $(SUCCESS_ALERT); }

    async isErrorPageDisplayed () {
        return (await this.errorPage).isDisplayed();
    }

    async isErrorAlertDisplayed () {
        return (await this.errorAlert).isDisplayed();
    }

    async isSuccessAlertDisplayed () {
        return (await this.successAlert).isDisplayed();
    }

    async clickSubmitButton () {
        return (await this.submitButton).click();
    }

    async clickNewsEmailCheckbox () {
        return (await this.newsEmailPreference).click();
    }

    async clickNewsSmsCheckbox () {
        return (await this.newsSmsPreference).click();
    }
};
