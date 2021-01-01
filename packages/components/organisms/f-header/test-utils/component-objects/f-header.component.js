const headerComponent = () => $('[data-test-id="header-component"]');
const loginLink = () => $('[data-test-id="login-link"]');
const offersLink = () => $$('[data-test-id="offers-link"]');
const deliveryEnquiryLink = () => $('[data-test-id="delivery-link"]');
const helpLink = () => $('[data-test-id="help-link"]');
const headerLogo = () => $('[data-test-id="header-logo"]');
const mobileNavigation = () => $('[data-test-id="nav-toggle"]');

const mobileOffersIcon = () => {
    return offersLink().filter(element => element.getAttribute('class').includes('u-showBelowMid'));
};

const navigationOffersLink = () => {
    return offersLink().filter(element => element.getAttribute('class').includes('u-showAboveMid'));
};

exports.waitForHeader = () => {
    headerComponent().waitForExist();
};

exports.isMobileOffersIconDisplayed = () => {
    const element = mobileOffersIcon();

    return element.length === 1 && element[0].isDisplayedInViewport();
};

exports.isNavigationOffersLinkDisplayed = () => {
    const element = navigationOffersLink();
    
    return element.length === 1 && element[0].isDisplayedInViewport();
};

exports.clickLoginLink = () => {
    loginLink().click();
};

exports.clickOffersLink = () => {
    navigationOffersLink()[0].click();
};

exports.openMobileNavigation = () => {
    mobileNavigation().click();
};

exports.clickDeliveryEnquiryLink = () => {
    deliveryEnquiryLink().click();
};

exports.clickHelpLink = () => {
    helpLink().click();
};

exports.isLogoDisplayed = () => headerLogo().isDisplayedInViewport();
exports.isMobileNavigationVisible = () => mobileNavigation().isDisplayedInViewport();
exports.isHelpLinkDisplayed = () => helpLink().isDisplayedInViewport(); 
exports.isLoginLinkDisplayed = () => loginLink().isDisplayedInViewport();
exports.isOffersLinkDesktopDisplayed = () => offersLinkDesktop().isDisplayedInViewport(); 
