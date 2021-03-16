const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    HEADER_COMPONENT,
    HEADER_LOGO,
    MOBILE_NAVIGATION_BAR,
    NAVIGATION
} = require ('./f-header.selectors');

module.exports = class Header extends Page {

    get component () { return $(HEADER_COMPONENT) }
    get logo () { return  $(HEADER_LOGO) }
    get mobileNavigationBar () { return $(MOBILE_NAVIGATION_BAR) }

    navigation = {
        offersIcon: {
            get link () { return $(NAVIGATION.offersIcon.link) }
        },
        offersLink: {
            get link () { return $(NAVIGATION.offersLink.link) }
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
            get link () { return $(NAVIGATION.countrySelector.link) },
            get currentIcon () { return $(NAVIGATION.countrySelector.currentIcon) },
            get countries () { return $$(NAVIGATION.countrySelector.countryList) }
        }
    }

    get countryLink () { return this.countryValue != null ?  this.countryValue : 'Please set a country value'; }

    set expectedCountry (country) {
        this.countryValue = this.navigation.countrySelector.countries.filter(element => element.getAttribute('data-test-id').includes(country))[0];
    }

    open () {
        super.openComponent('organism', 'header-component');
    }

    openWithExtraFeatures () {
        super.openComponent('organism', 'header-component&knob-Show%20offers%20link=true&knob-Show%20delivery%20enquiry=true');
    }

    openWithLocale (locale) {
        let countryFormatted = locale.toUpperCase();
        let formattedLocale = '';
        switch (countryFormatted) {
            case 'GB':
            case 'AU':
            case 'NZ':
            case 'IE':
                formattedLocale = `en-${countryFormatted}`;
                break;
            case 'DK':
                formattedLocale = `da-${countryFormatted}`;
                break;
            case 'ES':
                formattedLocale = `es-${countryFormatted}`;
                break;
            case 'IT':
                formattedLocale = `it-${countryFormatted}`;
                break;
            case 'NO':
                formattedLocale = `nb-${countryFormatted}`;
                break;
            default:
                throw new Error (`locale ${countryFormatted} is not supported`)
        }
        super.openComponent('organism', `header-component&knob-Locale=${formattedLocale}`);
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
        let expectedIcon = this.navigation.countrySelector.currentIcon.getAttribute('class').includes(`c-ficon--flag.${country}.round`);
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
        return this.navigation.offersLink.link.click();
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

    openMobileNavigation () {
        return this.mobileNavigationBar.click();
    }
};
