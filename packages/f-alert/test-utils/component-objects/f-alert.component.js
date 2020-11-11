const IDS = require('./data-test-ids');
// import IDS from './data-test-ids';
console.log(IDS.heading)
const alertComponent = () => $(`[data-test-id="${IDS.component.id}"]`);
const exitAlertButton = () => $(`[data-test-id="${IDS.buttons.cancel}"]`); 

exports.isAlertDisplayed = () => alertComponent().isDisplayed();
exports.waitForAlert = () => alertComponent().waitForExist();
exports.exitAlert = () => exitAlertButton().click(); 
