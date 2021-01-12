const errorMessageComponent = () => $('[data-test-id="error-message-component"]');

exports.isErrorMessageComponentDisplayed = () => errorMessageComponent().isDisplayed();
exports.waitForErrorMessage = () => errorMessageComponent().waitForExist();
