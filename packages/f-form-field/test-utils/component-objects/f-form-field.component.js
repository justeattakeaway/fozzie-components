const formFieldComponent = () => $('[data-test-id="formfield-firstname"]');
const testLabel = () => $('[data-test-id="formfield-firstname-label"]');
const input = () => $('[data-test-id="formfield-firstname-input"]');
/**
 * @param {Object} userInput
 * @param {String} userInput.firstName The user's first name
 * @description
 * The below function adds and displays the user's first name into the form-field component.
 */
exports.displayUserInput = userInput => {
    input().setValue(userInput.firstName);
    input().getValue();
};

exports.waitForFormField = () => formFieldComponent().waitForExist();

exports.isLabelDisplayed = () => testLabel().isDisplayed();
exports.isFormFieldDisplayed = () => formFieldComponent().isDisplayed();
