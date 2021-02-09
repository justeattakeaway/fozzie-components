const errorPageComponent = () => $('[data-test-id="errorPage"]');

exports.waitForErrorPageComponent = () => errorPageComponent().waitForExist();

exports.isErrorPageComponentDisplayed = () => errorPageComponent().isDisplayed();
