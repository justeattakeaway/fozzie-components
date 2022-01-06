const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    HEADER_COMPONENT,
    MOBILE_NAVIGATION_BAR,
    NAVIGATION
} = require('./f-header.selectors');


module.exports = class Header extends Page {
    constructor () {
        super('organism', 'header-component');
    }

    get component () { return $(HEADER_COMPONENT); }

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

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
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

    isNavigationItemClickable (item) {
        return this.navigation[item].link.isClickable();
    }

    openCountrySelector () {
        return this.navigation.countrySelector.link.click();
    }

    clickCountryListItem () {
        return this.countryLink.click();
    }

    moveToNavigationLink (item) {
        this.navigation[item].link.moveTo();
    }

    openMobileNavigationBar () {
        this.mobileNavigationBar.click();

        $('.is-navInView').waitForExist();
    }
};
