const registrationComponent = () => $('[data-test-id="registration-component"]');
const firstNameInput = () => registrationComponent().$('[data-test-id="input-first-name"]');
const lastNameInput = () => registrationComponent().$('[data-test-id="input-last-name"]');
const emailInput = () => registrationComponent().$('[data-test-id="input-email"]');
const passwordInput = () => registrationComponent().$('[data-test-id="input-password"]');
const createAccountButton = () => registrationComponent().$('[data-test-id="create-account-submit-button"]');

// Validation errors
const firstNameEmptyError = () => $('[data-test-id="error-first-name-empty"]');
const firstNameMaxLengthError = () => $('[data-test-id="error-first-name-maxlength"]');
const firstNameInvalidError = () => $('[data-test-id="error-first-name-invalid"]');

const lastNameEmptyError = () => $('[data-test-id="error-last-name-empty"]');
const lastNameMaxLengthError = () => $('[data-test-id="error-last-name-maxlength"]');
const lastNameInvalidError = () => $('[data-test-id="error-last-name-invalid"]');

const emailEmptyError = () => $('[data-test-id="error-email-empty"]');
const emailInvalidError = () => $('[data-test-id="error-email-invalid"]');
const emailExistsError = () => $('[data-test-id="error-email-exists"]');

const passwordEmptyError = () => $('[data-test-id="error-password-empty"]');

/**
 * @description
 * Inputs user details into the registration component and submits the form.
 *
 * @param {Object} userInfo
 * @param {String} userInfo.firstName    The user's first name
 * @param {String} userInfo.lastName The user's last name
 * @param {String} userInfo.email The user's e-mail address
 * @param {String} userInfo.password The user's password
 */
exports.submitRegistrationForm = (userInfo) => {

    registrationComponent().waitForExist();
    firstNameInput().setValue(userInfo.firstName);
    lastNameInput().setValue(userInfo.lastName);
    emailInput().setValue(userInfo.email);
    passwordInput().setValue(userInfo.password);
    createAccountButton().click();
}

exports.firstNameEmptyErrorIsDisplayed = () => firstNameEmptyError().isDisplayed();
exports.firstNameMaxLengthErrorIsDisplayed = () => firstNameMaxLengthError().isDisplayed();
exports.firstNameInvalidErrorIsDisplayed = () => firstNameInvalidError().isDisplayed();

exports.lastNameEmptyErrorIsDisplayed = () => lastNameEmptyError().isDisplayed();
exports.lastNameMaxLengthErrorIsDisplayed = () => lastNameMaxLengthError().isDisplayed();
exports.lastNameInvalidErrorIsDisplayed = () => lastNameInvalidError().isDisplayed();

exports.emailEmptyErrorIsDisplayed = () => emailEmptyError().isDisplayed();
exports.emailInvalidErrorIsDisplayed = () =>emailInvalidError().isDisplayed();
exports.emailExistsErrorIsDisplayed = () => emailExistsError().isDisplayed();
exports.passwordEmptyErrorIsDisplayed = () => passwordEmptyError().isDisplayed();
