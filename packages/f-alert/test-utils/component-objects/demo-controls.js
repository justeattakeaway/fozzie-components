const componentControls = () => $('[data-test-id="component-controls"]');

const controlAlertType = () => componentControls().$('[data-test-id="control-alertType"]');
const controlIsDismissible = () => componentControls().$('[data-test-id="control-isDismissible"]');
const controlHeading = () => componentControls().$('[data-test-id="control-heading"]');

/**
 * Sets the alert type of a component based off the 'Alert Type' control dropdown value
 * @param {string} alertType
 */
exports.selectAlertTypeByValue = alertType => {
    controlAlertType().selectByAttribute('value', alertType);
};

/**
 * Sets whether the component is dismissible based off the 'Is Dismissible' checkbox
 * @param {boolean} isDismissible
 */
exports.isDismissible = isDismissible => {
    if (!isDismissible && controlIsDismissible().isSelected()) {
        controlIsDismissible().click();
    }
};

/**
 * Sets the alert heading of a component based off the 'Heading' control input value
 * @param {string} headerText
 */
exports.setHeaderTextValue = headerText => {
    controlHeading().setValue(headerText);
};
