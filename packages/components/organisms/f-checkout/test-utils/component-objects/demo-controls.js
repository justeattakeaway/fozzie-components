const componentControls = () => $('[data-test-id="component-controls"]');

const controlCheckoutMethod = () => componentControls().$('[data-test-id="control-checkoutMethod"]');

/**
 * Sets the checkout type of a component based off the 'Checkout Type' control dropdown value
 * @param {string} checkoutType
 */
exports.selectCheckoutMethod = checkoutType => {
    controlCheckoutMethod().selectByAttribute('name', checkoutType);
};
