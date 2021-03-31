const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    REGISTRATION_COMPONENT,
    CREATE_ACCOUNT_BUTTON,
    TERMS_AND_CONDITIONS_LINK,
    PRIVACY_POLICY_LINK,
    COOKIES_POLICY_LINK,
    FIRST_NAME_INPUT,
    // FIRST_NAME_EMPTY_ERROR,
    // FIRST_NAME_MAX_LENGTH_ERROR,
    // FIRST_NAME_INVALID_ERROR,
    FIRST_NAME_ERROR_MESSAGE,
    LAST_NAME_INPUT,
    // LAST_NAME_EMPTY_ERROR,
    // LAST_NAME_MAX_LENGTH_ERROR,
    // LAST_NAME_INVALID_ERROR,
    LAST_NAME_ERROR_MESSAGE,
    EMAIL_INPUT,
    // EMAIL_EMPTY_ERROR,
    // EMAIL_EXISTS_ERROR,
    // EMAIL_INVALID_ERROR,
    EMAIL_ERROR_MESSAGE,
    PASSWORD_INPUT,
    // PASSWORD_EMPTY_ERROR,
    PASSWORD_ERROR_MESSAGE
} = require('./f-registration.selectors');

module.exports = class Registration extends Page {
    get component () { return $(REGISTRATION_COMPONENT); }

    get createAccountButton () { return $(CREATE_ACCOUNT_BUTTON); }

    get termsAndConditionsLink () { return $(TERMS_AND_CONDITIONS_LINK); }

    get privacyPolicyLink () { return $(PRIVACY_POLICY_LINK); }

    get cookiesPolicyLink () { return $(COOKIES_POLICY_LINK); }

    fields = {
        firstName: {
            get input () { return $(FIRST_NAME_INPUT); },
            // get emptyError () { return $(FIRST_NAME_EMPTY_ERROR) },
            // get maxLengthError () { return $(FIRST_NAME_MAX_LENGTH_ERROR) } ,
            // get invalidError () { return $(FIRST_NAME_INVALID_ERROR) }
            get errorMessage () { return $(FIRST_NAME_ERROR_MESSAGE).innerText; }
        },
        lastName: {
            get input () { return $(LAST_NAME_INPUT); },
            // get emptyError () { return $(LAST_NAME_EMPTY_ERROR) },
            // get maxLengthError () { return $(LAST_NAME_MAX_LENGTH_ERROR) },
            // get invalidError () { return  $(LAST_NAME_INVALID_ERROR) }
            get errorMessage () { return $(LAST_NAME_ERROR_MESSAGE).innerText; }
        },
        email: {
            get input () { return $(EMAIL_INPUT); },
            // get emptyError () { return $(EMAIL_EMPTY_ERROR) },
            // get invalidError () { return $(EMAIL_INVALID_ERROR) },
            // get existsError () { return $(EMAIL_EXISTS_ERROR) }
            get errorMessage () { return $(EMAIL_ERROR_MESSAGE).innerText; }
        },
        password: {
            get input () { return $(PASSWORD_INPUT); },
            get errorMessage () { return $(PASSWORD_ERROR_MESSAGE).innerText; }
        }
    };

    open () {
        super.openComponent('organism', 'registration-component');
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
        this.fields.firstName.input.setValue(userInfo.firstName);
        this.fields.lastName.input.setValue(userInfo.lastName);
        this.fields.email.input.setValue(userInfo.email);
        this.fields.password.input.setValue(userInfo.password);
        this.createAccountButton.click();
    }

    isEmptyErrorDisplayed (fieldName) {
        return this.fields[fieldName].errorMessage !== '';
    }

    isMaxLengthErrorDisplayed (fieldName) {
        return this.fields[fieldName].errorMessage === 'First name exceeds 50 characters';
    }

    isEmailExistsErrorDisplayed () {
        return this.fields.email.errorMessage === 'email bad';
    }

    isInvalidErrorDisplayed (fieldName) {
        return this.fields[fieldName].invalidError === 'What????';
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
