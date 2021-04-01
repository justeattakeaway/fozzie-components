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
        offersIcon: {
            get link () { return $(NAVIGATION.offersIcon.link); }
        },
        offersLink: {
            get link () { return $(NAVIGATION.offersLink.link); }
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

    /**
     * @description
     * Sets the data for the checkout component.
     *
     * @param {Object} header
     * @param {String} header.locale The checkout type
     * @param {String} header.offers The checkout authentication
     * @param {String} header.delivery The checkout authentication
     */

    open (header) {
        const countryFormatted = header.locale.toUpperCase();
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
                throw new Error(`locale ${countryFormatted} is not supported`);
        }
        const offersUrl = header.offers ? '&knob-Show%20offers%20link=true' : '';
        const deliveryUrl = header.delivery ? '&knob-Show%20delivery%20enquiry=true' : '';
        super.openComponent('organism', `header-component&knob-Locale=${formattedLocale}${offersUrl}${deliveryUrl}`);
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

    isNavigationLinkDisplayed (linkName) {
        return this.navigation[linkName].link.isDisplayedInViewport();
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

    isOffersIconLinkDisplayed () {
        return this.navigation.offersIcon.isDisplayed();
    }

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
