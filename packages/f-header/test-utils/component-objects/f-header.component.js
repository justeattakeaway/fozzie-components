import {
    HEADER_COMPONENT, 
    LOGIN_LINK, 
    OFFERS_LINK, 
    DELIVERY_ENQUIRY_LINK, 
    HELP_LINK, 
    HEADER_LOGO, 
    MOBILE_NAVIGATION
} from './f-header.selectors';

const headerComponent = () => $(HEADER_COMPONENT);

// Links 

const loginLink = () => $(LOGIN_LINK);
const offersLink = () => $$(OFFERS_LINK);
const deliveryEnquiryLink = () => $(DELIVERY_ENQUIRY_LINK);
const helpLink = () => $(HELP_LINK);

// Logo

const headerLogo = () => $(HEADER_LOGO);

// Navigation

const mobileNavigation = () => $(MOBILE_NAVIGATION);

// Functions

exports.waitForHeader = () => headerComponent().waitForExist();
exports.isLogoDisplayed = () => headerLogo().isDisplayedInViewport();
exports.isMobileNavigationVisible = () => mobileNavigation().isDisplayedInViewport();
exports.isHelpLinkDisplayed = () => helpLink().isDisplayedInViewport(); 
exports.isLoginLinkDisplayed = () => loginLink().isDisplayedInViewport();
exports.isOffersLinkDesktopDisplayed = () => offersLinkDesktop().isDisplayedInViewport(); 


const mobileOffersIcon = () => {
    return offersLink().filter(element => element.getAttribute('class').includes('u-showBelowMid'));
};

const navigationOffersLink = () => {
    return offersLink().filter(element => element.getAttribute('class').includes('u-showAboveMid'));
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

