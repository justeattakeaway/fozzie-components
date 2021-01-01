const buttonComponent = () => $('[data-test-id="button-component"]');

exports.waitForButtonComponent = () => buttonComponent().waitForExist();

exports.isButtonComponentDisplayed = () => buttonComponent().isDisplayed();
