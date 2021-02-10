const Page = require('../../../../../services/f-wdio-utils/src/page.object');
const {
    HEADER_COMPONENT, 
    HEADER_LOGO, 
    MOBILE_NAVIGATION_BAR, 
    NAVIGATION, 
    FLAGS
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
            get link () { return $$(NAVIGATION.countrySelector.link) },
            get flagsVisible () { return  $(NAVIGATION.countrySelector.flagsVisible) }, 
            get list () { return $$(NAVIGATION.countrySelector.list) }
        }
    }

    flags = {
        gb: {
            get flag () { return $(FLAGS.gb.id) },
        }, 
        au: {
            get flag () { return $(FLAGS.au.id)}
        }
    }

    get mobileOffersIcon () { 
        return this.navigation.offers.icon.filter(element => element.getAttribute('class').includes('u-showBelowMid')); 
    }
    get webOffersIcon () { 
        return this.navigation.offers.icon.filter(element => element.getAttribute('class').includes('u-showAboveMid')) 
    }

    // get openCountrySelector(){
    //     return this.navigation.countrySelector.link.filter(element => element.getAttribute('class').includes('is-open'));
    // };

    open(){
        super.openComponent('organism', 'header-component');
    }

    openWithExtraFeatures(){
        super.openComponent('organism', 'header-component&knob-Show%20offers%20link=true&knob-Show%20delivery%20enquiry=true')
    }

    openWithLocale(locale){
        super.openComponent('organism', `header-component&knob-Locale=en-${locale}`)
    }

    isCountrySelectorOpen(){
        return this.navigation.countrySelector.flagsVisible.isDisplayed();
    }



    isCountrySelectorIconDisplayed(locale) {
        locale.toLowerCase();
        let icon = this.navigation.countrySelector.link.filter(element => element.getAttribute('class').includes(`flag.${locale}.round`));
        return icon.isDisplayedInViewport();
    }

    isFlagDisplayed(country){
        this.flags[country].flag.isDisplayed();
        // browser.debug();
    };

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }

    isFieldLinkDisplayed(fieldName){
        return this.navigation[fieldName].link.isDisplayedInViewport();
    }

    // isCountrySelectorFlagDisplayed(fieldName){
    //     return this.navigation.countrySelector[fieldName].isDisplayedInViewport();
    // }

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

    openCountrySelector(){
        return this.navigation.countrySelector.link.click();
    }

    openMobileNavigation(){
        return this.mobileNavigationBar.click();
    }

    moveToCountrySelector(){
        this.navigation.countrySelector.link[0].moveTo();
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
