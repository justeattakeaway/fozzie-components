/* eslint-disable no-undef */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    REGISTRATION_COMPONENT,
    CREATE_ACCOUNT_BUTTON,
    TERMS_AND_CONDITIONS_LINK,
    PRIVACY_POLICY_LINK,
    COOKIES_POLICY_LINK,
    FIRST_NAME_INPUT,
    FIRST_NAME_ERROR_MESSAGE,
    LAST_NAME_INPUT,
    LAST_NAME_ERROR_MESSAGE,
    EMAIL_INPUT,
    EMAIL_ERROR_MESSAGE,
    PASSWORD_INPUT,
    PASSWORD_ERROR_MESSAGE
} = require('./f-registration.selectors');

module.exports = class Registration extends Page {
    constructor() {
        super('organism', 'registration-component');
    }

    get component () { return $(REGISTRATION_COMPONENT); }

    get createAccountButton () { return $(CREATE_ACCOUNT_BUTTON); }

    get termsAndConditionsLink () { return $(TERMS_AND_CONDITIONS_LINK); }

    get privacyPolicyLink () { return $(PRIVACY_POLICY_LINK); }

    get cookiesPolicyLink () { return $(COOKIES_POLICY_LINK); }

    fields = {
        firstName: {
            errorMessages: {
                maxCharacters: 'First name exceeds 50 characters',
                missing: 'Please include your first name',
                invalidFormat: 'Your first name can only contain letters, hyphens or apostrophes'
            },
            get input () { return $(FIRST_NAME_INPUT); },
            get errorMessage () { return $(FIRST_NAME_ERROR_MESSAGE).innerText; }
        },
        lastName: {
            errorMessages: {
                maxCharacters: 'Last name exceeds 50 characters',
                missing: 'Please include your last name',
                invalidFormat: 'Your last name can only contain letters, hyphens or apostrophes'
            },
            get input () { return $(LAST_NAME_INPUT); },
            get errorMessage () { return $(LAST_NAME_ERROR_MESSAGE).innerText; }
        },
        email: {
            errorMessages: {
                invalidFormat: 'Please enter your email address correctly',
                missing: 'Please enter your email address'
            },
            get input () { return $(EMAIL_INPUT); },
            get errorMessage () { return $(EMAIL_ERROR_MESSAGE).innerText; }
        },
        password: {
            errorMessages: {
                minLength: 'Password is less than four characters',
                missing: 'Please enter a password'
            },
            get input () { return $(PASSWORD_INPUT); },
            get errorMessage () { return $(PASSWORD_ERROR_MESSAGE).innerText; }
        }
    };

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isInputFieldDisplayed (fieldName) {
        return this.fields[fieldName].input.isDisplayed();
    }

    /**
     * @description
     * Inputs user details into the registration component and submits the form.
     *
     * @param {Object} userInfo
     * @param {String} userInfo.firstName The user's first name
     * @param {String} userInfo.lastName The user's last name
     * @param {String} userInfo.email The user's e-mail address
     * @param {String} userInfo.password The user's password
     */
    submitForm (userInfo) {
        const { fields } = this;
        fields.firstName.input.setValue(userInfo.firstName);
        fields.lastName.input.setValue(userInfo.lastName);
        fields.email.input.setValue(userInfo.email);
        fields.password.input.setValue(userInfo.password);
        this.createAccountButton.click();
    }

    isEmptyErrorDisplayed (fieldName) {
        const field = this.fields[fieldName];
        return field.errorMessage === field.missing;
    }

    isMaxLengthErrorDisplayed (fieldName) {
        const field = this.fields[fieldName];
        return field.errorMessage === field.maxCharacters;
    }

    isEmailExistsErrorDisplayed () {
        const field = this.fields.email;
        return field.errorMessage === field.exists;
    }

    isInvalidErrorDisplayed (fieldName) {
        const field = this.fields[fieldName];
        return field.innerText === field.invalidFormat;
    }

    termsAndConditionsLinkCanBeClicked () {
        return this.termsAndConditionsLink.isClickable();
    }

    privacyPolicyLinkCanBeClicked () {
        return this.privacyPolicyLink.isClickable();
    }

    cookiesPolicyLinkCanBeClicked () {
        return this.cookiesPolicyLink.isClickable();
    }
};
