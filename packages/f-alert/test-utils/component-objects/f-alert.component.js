const alertComponent = () => $('[data-test-id="alert-component"]');
const exitAlertButton = () => $('[data-test-id="alert-dismiss"]'); 

exports.isAlertDisplayed = () => alertComponent().isDisplayed();
exports.waitForAlert = () => alertComponent().waitForExist();
exports.exitAlert = () => exitAlertButton().click(); 
