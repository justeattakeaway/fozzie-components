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
            get link () { return  $(NAVIGATION.countrySelector.link) },
            get icons () { return $(NAVIGATION.countrySelector.icons) },
            get open () { return  $(NAVIGATION.countrySelector.open) }, 
            get flags() { return $$(NAVIGATION.countrySelector.listOfFlags) }
        }
    }

    get mobileOffersIcon () { 
        return this.navigation.offers.icon.filter(element => element.getAttribute('class').includes('u-showBelowMid')); 
    }
    get webOffersIcon () { 
        return this.navigation.offers.icon.filter(element => element.getAttribute('class').includes('u-showAboveMid')) 
    }

    set flag(country) {
        this.flagValue = this.navigation.countrySelector.flags.filter(element => element.getAttribute('data-test-id').includes(country));
    }

    set icon(country) {
        this.iconValue = this.navigation.countrySelector.icons.getAttribute('class').includes(country);
    }

    get flag(){
        return this.flagValue;
    }

    get icon(){
        return this.iconValue;
    }

    open(){
        super.openComponent('organism', 'header-component');
    }

    openWithExtraFeatures(){
        super.openComponent('organism', 'header-component&knob-Show%20offers%20link=true&knob-Show%20delivery%20enquiry=true')
    }

    openWithLocale(locale){
        locale.toUpperCase();
        super.openComponent('organism', `header-component&knob-Locale=en-${locale}`)
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }

    isCountrySelectorOpen(){
        return this.navigation.countrySelector.open.isDisplayed();
    }

    isFlagDisplayed(){
        return this.flag[0].isDisplayed();
    }

    isCorrectIconDisplayed(){
        console.log(this.icon[0]);
        return this.icon.isDisplayed();
    }

    clickFlag(){
        return this.flag[0].click();
    }

    // isCountrySelectorIconDisplayed(locale) {
    //     locale.toLowerCase();
    //     let icon = this.navigation.countrySelector.link.filter(element => element.getAttribute('class').includes(`flag.${locale}.round`));
    //     return icon.isDisplayedInViewport();
    // }

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
        this.navigation.countrySelector.link.moveTo();
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
