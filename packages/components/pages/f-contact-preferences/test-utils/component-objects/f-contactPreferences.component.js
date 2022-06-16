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


    isErrorPageDisplayed () {
        return this.errorPage.isDisplayed();
    }

    isErrorAlertDisplayed () {
        return this.errorAlert.isDisplayed();
    }

    isSuccessAlertDisplayed () {
        return this.successAlert.isDisplayed();
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
