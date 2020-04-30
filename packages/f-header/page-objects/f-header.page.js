const loginLink = $('[data-test-id="login-link"]');
const offersLink = $('[data-test-id="offers-link]"');
const deliveryEnquiryLink = $('[data-test-id="delivery-link"]');
const helpLink = $('[data-test-id="help-link"]');
const headerLogo = $('[data-test-id="header-logo"]');

export const clickLoginLink = () => {
    loginLink.click();
}

export const clickOffersLink = () => {
    offersLink.click();
}

export const clickDeliveryEnquiryLink = () => {
    deliveryEnquiryLink.click();
}

export const clickHelpLink = () => {
    helpLink.click();
}

export const logoIsDisplayed = () => {
    return headerLogo.isDisplayed();
}
