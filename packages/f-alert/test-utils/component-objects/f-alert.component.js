const IDs = require('./data-test-ids');

const alertComponent = () => $(`[data-test-id="${IDS.component.id}"]`);
const exitAlertButton = () => $(`[data-test-id="${IDS.button.cancel}"]`); 

exports.isAlertDisplayed = () => alertComponent().isDisplayed();
exports.waitForAlert = () => alertComponent().waitForExist();
exports.exitAlert = () => exitAlertButton().click(); 
