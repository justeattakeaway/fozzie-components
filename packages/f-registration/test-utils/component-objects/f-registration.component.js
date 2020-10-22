const registrationComponent = () => $('[data-test-id="registration-component"]');
const firstNameInput = () => registrationComponent().$('[data-test-id="input-first-name"]');
const lastNameInput = () => registrationComponent().$('[data-test-id="input-last-name"]');
const emailInput = () => registrationComponent().$('[data-test-id="input-email"]');
const passwordInput = () => registrationComponent().$('[data-test-id="input-password"]');
const createAccountButton = () => registrationComponent().$('[data-test-id="create-account-submit-button"]');

const termsAndConditionsLink = () => registrationComponent().$('[data-test-id="ts-and-cs-link"]');
const privacyPolicyLink = () => registrationComponent().$('[data-test-id="privacy-policy-link"]');
const cookiesPolicyLink = () => registrationComponent().$('[data-test-id="cookies-policy-link"]');
const errorSummaryContainer = () => $('[data-test-id="error-summary-container"]');

// Validation errors
const errorMessageFirstname = () => $('[data-test-id="error-message-firstname"]');
const errorMessageLastname = () => $('[data-test-id="error-message-lastname"]');
const errorMessageEmail = () => $('[data-test-id="error-message-email"]');
const errorMessagePassword = () => $('[data-test-id="error-message-password"]');

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
 exports.populateRegistrationForm = userInfo => {
     exports.waitForRegistrationForm();
     firstNameInput().setValue(userInfo.firstName);
     lastNameInput().setValue(userInfo.lastName);
     emailInput().setValue(userInfo.email);
     passwordInput().setValue(userInfo.password);
};

exports.submitRegistrationForm = () => {
    exports.waitForRegistrationForm();

    createAccountButton().click();
};

exports.waitForRegistrationForm = () => {
    registrationComponent().waitForExist();
};

exports.errorMessageFirstnameText = () => errorMessageFirstname().getText();

exports.errorMessageLastnameText = () => errorMessageLastname().getText();

exports.errorMessageEmailText = () => errorMessageEmail().getText();

exports.errorMessagePasswordText = () => errorMessagePassword().getText();

exports.termsAndConditionsLinkCanBeClicked = () => termsAndConditionsLink().isClickable();
exports.privacyPolicyLinkCanBeClicked = () => privacyPolicyLink().isClickable();
exports.cookiesPolicyLinkCanBeClicked = () => cookiesPolicyLink().isClickable();

exports.errorSummaryContainerRole = () => errorSummaryContainer().getAttribute('role');
exports.errorSummaryContainerDisplayed = () => errorSummaryContainer().isDisplayed();
exports.errorSummaryContainerMessageCount = () => errorSummaryContainer().$$('p').length;
exports.errorSummaryContainerMessageText = () => errorSummaryContainer().getText();
