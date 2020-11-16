const loginLink = () => $('[data-test-id="login-link"]');
const offersLinkMobile = () => $('[data-test-id="offers-link-mobile]"');
const deliveryEnquiryLink = () => $('[data-test-id="delivery-link"]');
const helpLink = () => $('[data-test-id="help-link"]');
const headerLogo = () => $('[data-test-id="header-logo"]');

exports.clickLoginLink = () => {
    loginLink().click();
}

exports.clickOffersLink = () => {
    offersLinkMobile().click();
}

//do one for offerslinkdesktop too

exports.clickDeliveryEnquiryLink = () => {
    deliveryEnquiryLink().click();
}

exports.clickHelpLink = () => {
    helpLink().click();
}

exports.isLogoDisplayed = () => headerLogo().isDisplayed();
