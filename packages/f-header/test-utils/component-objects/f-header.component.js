const loginLink = () => $('[data-test-id="login-link"]');
const offersLink = () => $('[data-test-id="offers-link]"');
const deliveryEnquiryLink = () => $('[data-test-id="delivery-link"]');
const helpLink = () => $('[data-test-id="help-link"]');
const headerLogo = () => $('[data-test-id="header-logo"]');

exports.clickLoginLink = () => {
    loginLink().click();
}

exports.clickOffersLink = () => {
    offersLink().click();
}

exports.clickDeliveryEnquiryLink = () => {
    deliveryEnquiryLink().click();
}

exports.clickHelpLink = () => {
    helpLink().click();
}

exports.isLogoDisplayed = () => headerLogo().isDisplayed();
