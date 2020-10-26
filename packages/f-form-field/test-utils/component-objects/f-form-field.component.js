const formFieldComponent = () => $('[data-test-id="form-field-component"]');
const testLabel = () => $('[data-test-id="testLabel"]');
const input = () => $('[data-test-id="testInput"]');
/**
 * @param {Object} userInput
 * @param {String} userInput.firstName The user's first name
 * @description
 * The below function adds and displays the user's first name into the form-field component.
 */
exports.displayUserInput = (userInput) => {
    input().setValue(userInput.firstName);
    input().getValue();
};

exports.waitForFormField = () => formFieldComponent().waitForExist();

exports.isLabelDisplayed = () => testLabel().isDisplayed();
exports.isFormFieldDisplayed = () => formFieldComponent().isDisplayed(); 
