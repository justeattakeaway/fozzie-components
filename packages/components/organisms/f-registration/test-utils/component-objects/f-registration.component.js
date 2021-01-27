import Page from "../../../../../../test/utils/page.object";

import {
    REGISTRATION_COMPONENT, 
    FIRST_NAME_INPUT, 
    LAST_NAME_INPUT, 
    EMAIL_INPUT, 
    PASSWORD_INPUT, 
    CREATE_ACCOUNT_BUTTON, 
    TERMS_AND_CONDITIONS_LINK, 
    PRIVACY_POLICY_LINK, 
    COOKIES_POLICY_LINK, 
    FIRST_NAME_EMPTY_ERROR, 
    FIRST_NAME_MAX_LENGTH_ERROR, 
    FIRST_NAME_INVALID_ERROR, 
    LAST_NAME_EMPTY_ERROR, 
    LAST_NAME_MAX_LENGTH_ERROR, 
    LAST_NAME_INVALID_ERROR,
    EMAIL_EMPTY_ERROR, 
    EMAIL_EXISTS_ERROR, 
    EMAIL_INVALID_ERROR, 
    PASSWORD_EMPTY_ERROR, 
    REQUEST_ERROR

} from './f-registration.selectors';

export default class Registration extends Page {

    get component () { return $(REGISTRATION_COMPONENT) }
    get createAccountButton () { return $(CREATE_ACCOUNT_BUTTON) }
    get termsAndConditionsLink () { return $(TERMS_AND_CONDITIONS_LINK) }
    get privacyPolicyLink () { return $(PRIVACY_POLICY_LINK) }
    get cookiesPolicyLink () { return $(COOKIES_POLICY_LINK) }
    get requestError () { return $(REQUEST_ERROR) }
  
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
            get invalidError () { return $(EMAIL_INVALID_ERROR) }
        }, 
        password: {
            get input () { return $(PASSWORD_INPUT) }, 
            get emptyError () { return $(PASSWORD_EMPTY_ERROR) }
        }
    };

    open() {
        super.openOrganism('registration-component')
    }

    waitForComponent(){
        super.waitForComponent(this.component)
    };

    isComponentDisplayed () {
        return this.component.isDisplayedInViewport();
    };

    isInputFieldDisplayed(fieldName){
        return this.fields[fieldName].input.isDisplayedInViewport();
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
        return this.fields[fieldName].emptyError.isDisplayedInViewport();
    };

    isMaxLengthErrorDisplayed(fieldName) {
        return this.fields[fieldName].maxLengthError.isDisplayedInViewport();
    };

    isInvalidErrorDisplayed(fieldName) {
        return this.fields[fieldName].invalidError.isDisplayedInViewport();
    };
    
    hasFormBeenSubmitted(){
        return this.requestError.isDisplayedInViewport();
    }

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
