const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    HEADER_COMPONENT,
    HEADER_LOGO,
    MOBILE_NAVIGATION_BAR,
    NAVIGATION
} = require('./f-header.selectors');

module.exports = class Header extends Page {
    get component () { return $(HEADER_COMPONENT); }

    get logo () { return $(HEADER_LOGO); }

    get mobileNavigationBar () { return $(MOBILE_NAVIGATION_BAR); }

    navigation = {
        offers: {
            get link () { return $(NAVIGATION.offers.link); }
        },
        help: {
            get link () { return $(NAVIGATION.help.link); }
        },
        delivery: {
            get link () { return $(NAVIGATION.delivery.link); }
        },
        userAccount: {
            get link () { return $(NAVIGATION.userAccount.link); }
        },
        countrySelector: {
            get link () { return $(NAVIGATION.countrySelector.link); },
            get currentIcon () { return $(NAVIGATION.countrySelector.currentIcon); },
            get countries () { return $$(NAVIGATION.countrySelector.countryList); }
        }
    }

    get countryLink () { return this.countryValue != null ? this.countryValue : 'Please set a country value'; }

    set expectedCountry (country) {
        this.countryValue = this.navigation.countrySelector.countries.filter(element => element.getAttribute('data-test-id').includes(country))[0];
    }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isLogoDisplayed () {
        return this.logo.isDisplayed();
    }

    isFieldLinkDisplayed (fieldName) {
        return this.navigation[fieldName].link.isDisplayedInViewport();
    }

    isCurrentCountryIconDisplayed (country) {
        const expectedIcon = this.navigation.countrySelector.currentIcon.getAttribute('class').includes(`c-ficon--flag.${country}.round`);
        return expectedIcon ? this.navigation.countrySelector.currentIcon.isDisplayed() : false;
    }

    isCountryLinkDisplayed () {
        return this.countryLink.isDisplayed();
    }

    isMobileNavigationBarDisplayed () {
        return this.mobileNavigationBar.isDisplayed();
    }

    // saving these for another ticket
    // isMobileOffersIconDisplayed(){
    //     return this.mobileOffersIcon.length === 1 && element[0].isDisplayed();
    // }

    // isWebOffersIconDisplayed(){
    //     return this.webOffersIcon.length === 1 && element[0].isDisplayed();
    // }

    clickOffersLink () {
        return this.navigation.offers.link.click();
    }

    clickHelpLink () {
        return this.navigation.help.link.click();
    }

    moveToCountrySelector () {
        this.navigation.countrySelector.link.moveTo();
    }

    openCountrySelector () {
        return this.navigation.countrySelector.link.click();
    }

    clickCountryListItem () {
        return this.countryLink.click();
    }

    openMobileNavigationBar () {
        return this.mobileNavigationBar.click();
    }
};
