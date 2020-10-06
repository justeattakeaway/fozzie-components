const checkoutComponent = () => $('[data-test-id="checkout-component"]');

exports.waitForCheckoutComponent = () => {
    checkoutComponent().waitForExist();
};

exports.isCheckoutComponentDisplayed = () => {
    checkoutComponent().isDisplayed();
};
