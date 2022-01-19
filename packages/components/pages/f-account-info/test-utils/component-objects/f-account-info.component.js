/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    COMPONENT,
    CHANGE_EMAIL_ADDRESS_LINK,
    SAVE_CHANGES_BUTTON,
    CHANGE_PASSWORD_BUTTON,
    DELETE_ACCOUNT_LINK,
    FIELDS,
    ERROR_CARD
} = require('./f-account-info-selectors');

module.exports = class AccountInfo extends Page {
    constructor () {
        super('page', 'account-info-component');
    }

    get component () { return $(COMPONENT); }

    get errorCardComponent () { return $(ERROR_CARD); }

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
    }

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
    }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    waitForErrorCardComponent () {
        super.waitForComponent(this.errorCardComponent);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isErrorCardComponentDisplayed () {
        return this.errorCardComponent.isDisplayed();
    }

    /**
    * @description
    * Select all the text in the field and then performs a backspace to clear the field
    *
    * @param {String} fieldName The name of the field input it is clearing
    */
    clearBlurField (fieldName) {
        // Determines the OS
        const CONTROL = process.platform === 'darwin' ? 'Command' : '\uE009';
        const el = this.fields[fieldName].input;
        el.click();
        el.keys([CONTROL, 'a']);
        el.keys(['Backspace']);
    }

    /**
    * @description
    * Tab out of provided field
    *
    * @param {String} fieldName The name of the field to tab out of
    */
    tabOutOfField (fieldName) {
        const el = this.fields[fieldName].input;
        el.keys(['Tab']);
    }

    /**
    * @description
    * Inputs customer details into the account-info component.
    *
    * @param {Object} customerInput customer input details
    */
    populateAccountForm (field, customerInput) {
        this.fields[field].input.setValue(customerInput[field].input);
    }

    clickOutOfInputField () {
        this.component.click();
    }

    isEmptyErrorMessageDisplayed (fieldName) {
        return this.fields[fieldName].emptyError.isDisplayed();
    }

    isInvalidErrorMessageDisplayed (fieldName) {
        return this.fields[fieldName].invalidError.isDisplayed();
    }

    canBeClicked (callToActionName) {
        return this.LinksAndButtons[callToActionName].cta.isClickable();
    }

    isDisabled (field) {
        return !this.fields[field].input.isEnabled();
    }
};
