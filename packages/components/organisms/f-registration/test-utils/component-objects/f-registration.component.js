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
} from './f-registration.selectors';

export default class Registration extends Page {

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
            get firstNameInvalidError () { return $(FIRST_NAME_INVALID_ERROR) }
        }, 
        lastName: {
            get input () { return $(LAST_NAME_INPUT) }, 
            get emptyError () { return $(LAST_NAME_EMPTY_ERROR) }, 
            get maxLengthError () { return $(LAST_NAME_MAX_LENGTH_ERROR) }, 
            get lastNameInvalidError () { return  $(LAST_NAME_INVALID_ERROR) }
        }, 
        email: {
            get input () { return $(EMAIL_INPUT) }, 
            get emptyError () { return $(EMAIL_EMPTY_ERROR) }, 
            get emailExistsError () { return $(EMAIL_EXISTS_ERROR) }, 
            get emailInvalidError () { return $(EMAIL_INVALID_ERROR) }
        }, 
        password: {
            get input () { return $(PASSWORD_INPUT) }, 
            get emptyError () { return $(PASSWORD_EMPTY_ERROR) }
        }
    };

    isInputFieldDisplayed(fieldName){
        return this.fields[fieldName].input.isDisplayed();
    }

    isEmptyErrorDisplayed(fieldName){

    }


    open() {
        super.openOrganism('registration-component')
    }

    waitForComponent(){
        super.waitForComponent(this.component)
    };

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isFirstNameEmptyErrorDisplayed(){
        this.firstNameEmptyError.isDisplayed();
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

submitForm(userInfo){
    // waitForComponent();

    this.firstNameInput.setValue(userInfo.firstName)
    this.createAccountButton.click();

    // this.firstNameInput.setValue(userInfo.firstName);
    // this.lastNameInput.setValue(userInfo.lastName);
    // this.emailInput.setValue(userInfo.email);
    // this.passwordInput.setValue(userInfo.password);
    // this.createAccountButton.click();
    };
}

// page Object model - put generic functions here - e.g.$

// // isDisplayed(element){
// //     element.isDisplayed()
// // }

exports.isFirstNameEmptyErrorDisplayed = () => firstNameEmptyError().isDisplayed();
exports.isFirstNameMaxLengthErrorDisplayed = () => firstNameMaxLengthError().isDisplayed();
exports.isFirstNameInvalidErrorDisplayed = () => firstNameInvalidError().isDisplayed();

// exports.isLastNameEmptyErrorDisplayed = () => lastNameEmptyError().isDisplayed();
// exports.isLastNameMaxLengthErrorDisplayed = () => lastNameMaxLengthError().isDisplayed();
// exports.isLastNameInvalidErrorDisplayed = () => lastNameInvalidError().isDisplayed();

// exports.isEmailEmptyErrorDisplayed = () => emailEmptyError().isDisplayed();
// exports.isEmailInvalidErrorDisplayed = () => emailInvalidError().isDisplayed();
// exports.isEmailExistsErrorDisplayed = () => emailExistsError().isDisplayed();
// exports.isPasswordEmptyErrorDisplayed = () => passwordEmptyError().isDisplayed();

// exports.termsAndConditionsLinkCanBeClicked = () => termsAndConditionsLink().isClickable();
// exports.privacyPolicyLinkCanBeClicked = () => privacyPolicyLink().isClickable();
// exports.cookiesPolicyLinkCanBeClicked = () => cookiesPolicyLink().isClickable();

  // get firstNameInput () { return $(FIRST_NAME_INPUT) }
    // get lastNameInput () { return $(LAST_NAME_INPUT) }
    // get emailInput () { return $(EMAIL_INPUT) }
    // get passwordInput () { return $(PASSWORD_INPUT) }

    
    // get firstNameEmptyError () { return $(FIRST_NAME_EMPTY_ERROR) }
    // get firstNameMaxLengthError () { return $(FIRST_NAME_MAX_LENGTH_ERROR) }
    // get firstNameInvalidError () { return $(FIRST_NAME_INVALID_ERROR) }
    
    // get lastNameEmptyError () { return $(LAST_NAME_EMPTY_ERROR) }
    // get lastNameMaxLengthError () { return $(LAST_NAME_MAX_LENGTH_ERROR) }
    // get lastNameInvalidError () { return $(LAST_NAME_INVALID_ERROR) }
    
    // get emailEmptyError () { return $(EMAIL_EMPTY_ERROR) }
    // get emailExistsError () { return $(EMAIL_EXISTS_ERROR) }
    // get emailInvalidError () { return $(EMAIL_INVALID_ERROR) }
    
    // get passwordEmptyError () { return $(PASSWORD_EMPTY_ERROR) }