const Page = require('../../../../../services/f-wdio-utils/src/page.object');
const {
    HEADER_COMPONENT, 
    HEADER_LOGO, 
    MOBILE_NAVIGATION_BAR, 
    NAVIGATION
} = require ('./f-header.selectors');

class Header extends Page {

    get component () { return $(HEADER_COMPONENT) }
    get logo () { return  $(HEADER_LOGO) }
    get mobileNavigationBar () { return $(MOBILE_NAVIGATION_BAR) }

    navigation = {
        offers: {
            get link () { return $(NAVIGATION.offers.link) },
            get icon () { return $$(NAVIGATION.offers.link) }
        }, 
        help: {
            get link () { return $(NAVIGATION.help.link) }
        }, 
        delivery: {
            get link () { return $(NAVIGATION.delivery.link) }, 
        }, 
        userAccount: {
            get link () { return $(NAVIGATION.userAccount.link) }
        }, 
        countrySelector: {
            get link () { return $(NAVIGATION.userAccount.link) },
            countries : {
                get gb () { return $(NAVIGATION.countrySelector.countries.gb) },
                get au () { return $(NAVIGATION.countrySelector.countries.au) },
                get fr () { return $(NAVIGATION.countrySelector.countries.fr) },
                get it () { return $(NAVIGATION.countrySelector.countries.it) },
                get nz () { return $(NAVIGATION.countrySelector.countries.nz) },
                get es () { return $(NAVIGATION.countrySelector.countries.es) }
            }
        }
    }

    get mobileOffersIcon () { 
        return navigation.offers.icon.filter(element => element.getAttribute('class').includes('u-showBelowMid')); 
    }
    get webOffersIcon () { 
        return navigation.offers.icon.filter(element => element.getAttribute('class').includes('u-showAboveMid')) 
    }

    open(){
        super.openComponent('organism', 'header-component');
    }

    openExtraFeatures(){
        super.openComponent('organism', 'header-component&knob-Show%20offers%20link=true&knob-Show%20delivery%20enquiry=true')
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }

    isFieldLinkDisplayed(fieldName){
        return this.navigation[fieldName].link.isDisplayed();
    }

    isLogoDisplayed(){
        return this.logo.isDisplayed();
    }

    isMobileNavigationBarDisplayed(){
        return this.mobileNavigationBar.isDisplayed();
    }

    isMobileOffersIconDisplayed(){
        return this.mobileOffersIcon.length === 1 && element[0].isDisplayed();
    }

    isWebOffersIconDisplayed(){
        return this.webOffersIcon.length === 1 && element[0].isDisplayed();
    }

    clickOffersLink(){
        return this.navigation.offers.link.click();
    }

    clickHelpLink(){
        return this.navigation.help.link.click();
    }

    openMobileNavigation(){
        return this.mobileNavigationBar.click();
    }
  
}

// // Functions

// exports.waitForHeader = () => headerComponent().waitForExist();
// exports.isFieldLinkDisplayed = fieldName => navigation[fieldName].link().isDisplayedInViewport();
// exports.isLogoDisplayed = () => headerLogo().isDisplayedInViewport();
// exports.isMobileNavigationBarVisible = () => mobileNavigationBar().isDisplayedInViewport();

// exports.isMobileOffersIconDisplayed = () => {
//     const element = mobileOffersIcon();

//     return element.length === 1 && element[0].isDisplayedInViewport();
// };

// exports.isWebOffersIconDisplayed = () => {
//     const element = webOffersIcon();

//     return element.length === 1 && element[0].isDisplayedInViewport();
// }

// exports.clickOffersLink = () => {
//     navigation.offers.link().click();
// };

// exports.clickHelpLink = () => {
//     navigation.help.link().click();
// };

// exports.openMobileNavigation = () => {
//     mobileNavigationBar().click();
// };

module.exports = Header;
