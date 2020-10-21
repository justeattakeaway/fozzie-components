const formFieldComponent = () => $('[data-test-id="form-field-component"]');
const testLabel = () => $('[data-test-id="testLabel"]');
const fieldInput = () => $('input');

/**
 * @description
 * Inputs user's first name into the form-field component.
 *
 * @param {Object} userInput
 * @param {String} userInput.firstName The user's first name
 */

exports.waitForFormField = () => formFieldComponent().waitForExist();

exports.displayUserInput = (userInput) => {
    fieldInput().setValue(userInput.firstName);
    fieldInput().getValue()
};

exports.isLabelDisplayed = () => testLabel().isDisplayed();
exports.isFormFieldDisplayed = () => formFieldComponent().isDisplayed(); 
