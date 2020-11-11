import { testIds } from './data-test-ids';

const alertComponent = () => $(`[data-test-id="${testIds.id}"]`);
const exitAlertButton = () => $(`[data-test-id="${testIds.buttons.cancel}"]`); 

exports.isAlertDisplayed = () => alertComponent().isDisplayed();
exports.waitForAlert = () => alertComponent().waitForExist();
exports.exitAlert = () => exitAlertButton().click(); 
exports.alertID = () => {
    return `[data-test-id="${testIds.id}"]`
};