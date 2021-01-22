const buttonComponent = () => $('[data-test-id="action-button-component"]');

exports.waitForButtonComponent = () => buttonComponent().waitForExist();

exports.isButtonComponentDisplayed = () => buttonComponent().isDisplayed();
