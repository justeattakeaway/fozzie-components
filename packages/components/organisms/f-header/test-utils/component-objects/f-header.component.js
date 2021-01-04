import {
    HEADER_COMPONENT, 
    HEADER_LOGO, 
    MOBILE_NAVIGATION_BAR, 
    NAVIGATION
} from './f-header.selectors';

// Component
const headerComponent = () => $(HEADER_COMPONENT);

// Logo
const headerLogo = () => $(HEADER_LOGO);

// Navigation
const navigation = {
    offers: {
        link: () => $(NAVIGATION.offers.link), 
        icon: () => $$(NAVIGATION.offers.link)
    }, 
    help: {
        link: () => $(NAVIGATION.help.link), 
    }, 
    delivery: {
        link: () => $(NAVIGATION.delivery.link), 
    }, 
    userAccount: {
        link: () => $(NAVIGATION.userAccount.link), 
    } 
}
const mobileNavigationBar = () => $(MOBILE_NAVIGATION_BAR);
const mobileOffersIcon = () => {
    return navigation.offers.icon().filter(element => element.getAttribute('class').includes('u-showBelowMid'));
};

//Functions

exports.waitForHeader = () => headerComponent().waitForExist();
exports.isFieldLinkDisplayed = fieldName => navigation[fieldName].link().isDisplayedInViewport();
exports.isLogoDisplayed = () => headerLogo().isDisplayedInViewport();
exports.isMobileNavigationBarVisible = () => mobileNavigationBar().isDisplayedInViewport();

exports.isMobileOffersIconDisplayed = () => {
    const element = mobileOffersIcon();

    return element.length === 1 && element[0].isDisplayedInViewport();
};

exports.clickOffersLink = () => {
    navigation.offers.link().click();
};

exports.clickHelpLink = () => {
    navigation.help.link().click();
};

exports.openMobileNavigation = () => {
    mobileNavigationBar().click();
};
