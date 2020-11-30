const componentControls = () => $('[data-test-id="component-controls"]');

const controlAlertType = () => componentControls().$('[data-test-id="control-alertType"]');
const controlIsDismissable = () => componentControls().$('[data-test-id="control-isDismissable"]');
const controlHeading = () => componentControls().$('[data-test-id="control-heading"]');

/**
 * Sets the alert type of a component based off the 'Alert Type' control dropdown value
 * @param {string} alertType
 */
exports.selectAlertTypeByValue = alertType => {
    controlAlertType().selectByAttribute('value', alertType);
};

/**
 * Sets the alert type of a component based off the 'Alert Type' control dropdown value
 * @param {string} alertType
 */
exports.isDissmiable = () => {
    controlIsDismissable().click();
};

/**
 * Sets the alert heading of a component based off the 'Heading' control input value
 * @param {string} headerText
 */
exports.setHeaderTextValue = headerText => {
    controlHeading().setValue(headerText);
};
