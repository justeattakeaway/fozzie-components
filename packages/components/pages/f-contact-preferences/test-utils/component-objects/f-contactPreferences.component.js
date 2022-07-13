import Page from '@justeat/f-wdio-utils';
import {
    ERROR_PAGE,
    SUBMIT_BUTTON,
    CHECKBOXES,
    ERROR_ALERT,
    SUCCESS_ALERT
} from './selectors';

class ContactPreferences extends Page {
    constructor () {
        super('page', 'contact-preferences-component');
    }

    get errorPage () { return $(ERROR_PAGE); }

    get submitButton () { return $(SUBMIT_BUTTON); }

    get newsEmailPreference () { return $(CHECKBOXES.news.email); }

    get newsSmsPreference () { return $(CHECKBOXES.news.sms); }

    get errorAlert () { return $(ERROR_ALERT); }

    get successAlert () { return $(SUCCESS_ALERT); }


    async isErrorAlertDisplayed () {
        return this.errorAlert.isDisplayed();
    }

    async isSuccessAlertDisplayed () {
        return this.successAlert.isDisplayed();
    }

    async clickSubmitButton () {
        await this.submitButton.click();
    }

    async clickNewsEmailCheckbox () {
        await this.newsEmailPreference.click();
    }

    async clickNewsSmsCheckbox () {
        await this.newsSmsPreference.click();
    }
}

export default new ContactPreferences();
