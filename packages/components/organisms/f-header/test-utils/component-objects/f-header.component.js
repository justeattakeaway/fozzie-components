import {
    HEADER_COMPONENT, 
    HEADER_LOGO, 
    MOBILE_NAVIGATION_BAR, 
    NAVIGATION, 
    URLS
} from './f-header.selectors';

// Component
const headerComponent = () => $(HEADER_COMPONENT);

// Logo
const headerLogo = () => $(HEADER_LOGO);

exports.URL = () => URLS.default;
exports.offers = () => URLS.offers;
exports.delivery = () => URLS.delivery;
exports.userAccount = () => URLS.userAccount;

// export const urls = {
//     default: () => URLS.default,
//     offers: () => URLS.offers,
//     delivery: () => URLS.delivery, 
//     userAccount: () => URLS.userAccount
// }


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
const mobileOffersIcon = () => 
    navigation.offers.icon().filter(element => element.getAttribute('class').includes('u-showBelowMid'));
    
const webOffersIcon = () =>
    navigation.offers.icon().filter(element => element.getAttribute('class').includes('u-showAboveMid'));

// Functions
// exports.open = (path, knobs='') => {
//     if (knobs !== 'offers' ){
//         browser.url(`/iframe.html?id=components-organisms--${path}&knob-Show%20${knobs}%20link=true`);
//     } else if (knobs === 'all') {
//         browser.url(`/iframe.html?id=components-organisms--${path}`)
//     } else if (knobs === '') {
//         browser.url(`/iframe.html?id=components-organisms--header-component&knob-Show%20offers%20link=true&knob-Show%20delivery%20enquiry=true&viewMode=story`);
//     } 
// }

// exports.getURL = fieldName => url[fieldName]();
// exports.defaultURL = () => {
//   return defaultURL;
// }
exports.waitForHeader = () => headerComponent().waitForExist();
exports.isFieldLinkDisplayed = fieldName => navigation[fieldName].link().isDisplayedInViewport();
exports.isLogoDisplayed = () => headerLogo().isDisplayedInViewport();
exports.isMobileNavigationBarVisible = () => mobileNavigationBar().isDisplayedInViewport();

exports.isMobileOffersIconDisplayed = () => {
    const element = mobileOffersIcon();

    return element.length === 1 && element[0].isDisplayedInViewport();
};

// exports.open = (path) => {
//    if OPTIONS.name === path {
//        return URL.
//    }
// }


exports.isWebOffersIconDisplayed = () => {
    const element = webOffersIcon();

    return element.length === 1 && element[0].isDisplayedInViewport();
}

exports.clickOffersLink = () => {
    navigation.offers.link().click();
};

exports.clickHelpLink = () => {
    navigation.help.link().click();
};

exports.openMobileNavigation = () => {
    mobileNavigationBar().click();
};
