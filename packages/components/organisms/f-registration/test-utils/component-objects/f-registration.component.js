const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    REGISTRATION_COMPONENT, 
    CREATE_ACCOUNT_BUTTON, 
    TERMS_AND_CONDITIONS_LINK, 
    PRIVACY_POLICY_LINK, 
    COOKIES_POLICY_LINK,
    FIRST_NAME_INPUT,
    FIRST_NAME_EMPTY_ERROR,
    FIRST_NAME_MAX_LENGTH_ERROR,
    FIRST_NAME_INVALID_ERROR,
    LAST_NAME_INPUT,
    LAST_NAME_EMPTY_ERROR,
    LAST_NAME_MAX_LENGTH_ERROR,
    LAST_NAME_INVALID_ERROR,
    EMAIL_INPUT,
    EMAIL_EMPTY_ERROR,
    EMAIL_EXISTS_ERROR,
    EMAIL_INVALID_ERROR,
    PASSWORD_INPUT,
    PASSWORD_EMPTY_ERROR, 
} = require('./f-registration.selectors');

class Registration extends Page {

    get component () { return $(REGISTRATION_COMPONENT) }
    get createAccountButton () { return $(CREATE_ACCOUNT_BUTTON) }
    get termsAndConditionsLink () { return $(TERMS_AND_CONDITIONS_LINK) }
    get privacyPolicyLink () { return $(PRIVACY_POLICY_LINK) }
    get cookiesPolicyLink () { return $(COOKIES_POLICY_LINK) }
  
    fields = {
        firstName: {
            get input () { return $(FIRST_NAME_INPUT) }, 
            get emptyError () { return $(FIRST_NAME_EMPTY_ERROR) }, 
            get maxLengthError () { return $(FIRST_NAME_MAX_LENGTH_ERROR) } , 
            get invalidError () { return $(FIRST_NAME_INVALID_ERROR) }
        }, 
        lastName: {
            get input () { return $(LAST_NAME_INPUT) }, 
            get emptyError () { return $(LAST_NAME_EMPTY_ERROR) }, 
            get maxLengthError () { return $(LAST_NAME_MAX_LENGTH_ERROR) }, 
            get invalidError () { return  $(LAST_NAME_INVALID_ERROR) }
        }, 
        email: {
            get input () { return $(EMAIL_INPUT) }, 
            get emptyError () { return $(EMAIL_EMPTY_ERROR) }, 
            get invalidError () { return $(EMAIL_INVALID_ERROR) }, 
            get existsError () { return $(EMAIL_EXISTS_ERROR) }
        }, 
        password: {
            get input () { return $(PASSWORD_INPUT) }, 
            get emptyError () { return $(PASSWORD_EMPTY_ERROR) }
        }
    };

    open() {
        super.openComponent('organism', 'registration-component');
    };

    waitForComponent(){
        super.waitForComponent(this.component);
    };

    isComponentDisplayed () {
        return this.component.isDisplayed();
    };

    isInputFieldDisplayed(fieldName){
        return this.fields[fieldName].input.isDisplayed();
    };
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
    submitForm(userInfo){
        this.fields.firstName.input.setValue(userInfo.firstName); 
        this.fields.lastName.input.setValue(userInfo.lastName);
        this.fields.email.input.setValue(userInfo.email);
        this.fields.password.input.setValue(userInfo.password);
        this.createAccountButton.click();
    };

    isEmptyErrorDisplayed(fieldName){
        return this.fields[fieldName].emptyError.isDisplayed();
    };

    isMaxLengthErrorDisplayed(fieldName) {
        return this.fields[fieldName].maxLengthError.isDisplayed();
    };

    isEmailExistsErrorDisplayed(){
        return this.fields.email.existsError.isDisplayed();
    }

    isInvalidErrorDisplayed(fieldName) {
        return this.fields[fieldName].invalidError.isDisplayed();
    };

    termsAndConditionsLinkCanBeClicked(){
        return this.termsAndConditionsLink.isClickable();
    };

    privacyPolicyLinkCanBeClicked(){
        return this.privacyPolicyLink.isClickable();
    };
    
    cookiesPolicyLinkCanBeClicked(){
        return this.cookiesPolicyLink.isClickable();
    };
};

module.exports = Registration;
