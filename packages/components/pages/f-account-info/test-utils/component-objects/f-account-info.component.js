const Page = require('@justeat/f-wdio-utils/src/base.page');
const {
    CHANGE_EMAIL_ADDRESS_LINK,
    SAVE_CHANGES_BUTTON,
    CHANGE_PASSWORD_BUTTON,
    DELETE_ACCOUNT_LINK,
    FIELDS,
    ERROR_CARD,
    ERROR_ALERT,
    SUCCESS_ALERT
} = require('./f-account-info-selectors');

module.exports = class AccountInfo extends Page {
    constructor () {
        super('page', 'account-info-component');
    }

    get errorCardComponent () { return $(ERROR_CARD); }

    get errorAlert () { return $(ERROR_ALERT); }

    get successAlert () { return $(SUCCESS_ALERT); }

    LinksAndButtons = {
        changeEmailAddressLink: {
            get cta () { return $(CHANGE_EMAIL_ADDRESS_LINK); }
        },
        saveChangesButton: {
            get cta () { return $(SAVE_CHANGES_BUTTON); }
        },
        changePasswordButton: {
            get cta () { return $(CHANGE_PASSWORD_BUTTON); }
        },
        deleteAccountLink: {
            get cta () { return $(DELETE_ACCOUNT_LINK); }
        }
    };

    fields = {
        firstName: {
            get input () { return $(FIELDS.firstName.input); },
            get emptyError () { return $(FIELDS.firstName.emptyError); },
            get invalidError () { return $(FIELDS.firstName.invalidError); }
        },
        lastName: {
            get input () { return $(FIELDS.lastName.input); },
            get emptyError () { return $(FIELDS.lastName.emptyError); },
            get invalidError () { return $(FIELDS.lastName.invalidError); }
        },
        emailAddress: {
            get input () { return $(FIELDS.emailAddress.input); }
        },
        phoneNumber: {
            get input () { return $(FIELDS.phoneNumber.input); },
            get emptyError () { return $(FIELDS.phoneNumber.emptyError); },
            get invalidError () { return $(FIELDS.phoneNumber.invalidError); }
        },
        addressLine1: {
            get input () { return $(FIELDS.addressLine1.input); },
            get emptyError () { return $(FIELDS.addressLine1.emptyError); }
        },
        addressLine2: {
            get input () { return $(FIELDS.addressLine2.input); }
        },
        addressLine3: {
            get input () { return $(FIELDS.addressLine3.input); }
        },
        city: {
            get input () { return $(FIELDS.city.input); },
            get emptyError () { return $(FIELDS.city.emptyError); }
        },
        postcode: {
            get input () { return $(FIELDS.postcode.input); },
            get emptyError () { return $(FIELDS.postcode.emptyError); },
            get invalidError () { return $(FIELDS.postcode.invalidError); }
        }
    };

    async isErrorCardComponentDisplayed () {
        return (await this.errorCardComponent).isDisplayed();
    }

    /**
    * @description
    * Tab out of provided field
    *
    * @param {String} fieldName The name of the field to tab out of
    */
    async tabOutOfField (fieldName) {
        const el = await this.fields[fieldName].input;
        await el.keys(['Tab']);
    }

    async clickOutOfInputField () {
        (await this.component).click();
    }

    async clickSaveButton () {
        (await this.LinksAndButtons.saveChangesButton.cta).click();
    }

    async clickChangePassword () {
        return (await this.LinksAndButtons.changePasswordButton.cta).click();
    }

    async clickDeleteAccountLink () {
        return (await this.LinksAndButtons.deleteAccountLink.cta).click();
    }

    async clickChangeEmailAddressLink () {
        return (await this.LinksAndButtons.changeEmailAddressLink.cta).click();
    }

    async isEmptyErrorMessageDisplayed (fieldName) {
        return (await this.fields[fieldName].emptyError).isDisplayed();
    }

    async isInvalidErrorMessageDisplayed (fieldName) {
        return (await this.fields[fieldName].invalidError).isDisplayed();
    }

    async canBeClicked (callToActionName) {
        return (await this.LinksAndButtons[callToActionName].cta).isClickable();
    }

    async isDisabled (field) {
        return !await this.fields[field].input.isEnabled();
    }

    async isErrorAlertDisplayed () {
        return (await this.errorAlert).isDisplayed();
    }

    async waitForErrorAlertDisplayed () {
        (await this.errorAlert).waitUntil(async () => this.isDisplayed());
    }

    async isSuccessAlertDisplayed () {
        return (await this.successAlert).isDisplayed();
    }

    async waitForSuccessAlertDisplayed () {
        (await this.successAlert).waitUntil(async () => this.isDisplayed());
    }
};
