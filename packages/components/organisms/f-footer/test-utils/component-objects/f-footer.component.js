const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    FOOTER_COMPONENT,
    FOOTER_ICONS,
    DOWNLOAD_ICONS,
    COURIER_LINKS,
    SOCIAL_ICONS,
    COUNTRY_SELECTOR_BUTTON,
    CURRENT_COUNTRY_ICON,
    CURRENT_COUNTRY_TEXT,
    COUNTRY_LIST
} = require('./f-footer.selectors');

module.exports = class Footer extends Page {
    get component () { return $(FOOTER_COMPONENT); }

    get icons () { return $$(FOOTER_ICONS); }

    get downloadIcons () { return $$(DOWNLOAD_ICONS); }

    get socialIcons () { return $$(SOCIAL_ICONS); }

    get courierLinks () { return $(COURIER_LINKS); }

    get downloadIcon () { return this.downloadIconValue; }

    get socialIcon () { return this.socialIconValue; }

    get countrySelectorButton () { return $(COUNTRY_SELECTOR_BUTTON); }

    get currentFlagIcon () { return $(CURRENT_COUNTRY_ICON); }

    get currentCountryText () { return $(CURRENT_COUNTRY_TEXT); }

    get countries () { return $$(COUNTRY_LIST); }

    get countryLink () { return this.countryValue != null ? this.countryValue : 'Please set a country value'; }

    set expectedDownloadIcon (icon) {
        this.downloadIconValue = this.downloadIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
    }

    set expectedSocialIcon (icon) {
        this.socialIconValue = this.socialIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
    }

    set expectedCountry (country) {
        this.countryValue = this.countries.filter(element => element.getAttribute('data-test-id').includes(country))[0];
    }

    /**
     * @description
     * Sets the data for the checkout component.
     *
     * @param {Object} footer
     * @param {String} footer.locale The checkout type
     * @param {String} footer.countrySelector The checkout authentication
     * @param {String} footer.courierLinks The checkout authentication
     */

    open (footer) {
        console.log(footer); // eslint-disable-line no-console
        const countryFormatted = footer.locale.toUpperCase();
        const showCountrySelector = `&knob-Show%20country%20selector=${footer.countrySelector}`;
        const showCourierLinks = `&knob-Show%20courier%20links=${footer.courierLinks}`;
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

        const url = `footer-component&knob-Locale=${formattedLocale}${showCountrySelector}${showCourierLinks}`;
        super.openComponent('organism', url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isDownloadIconDisplayed () {
        return this.downloadIcon.isDisplayed();
    }

    clickDownloadIcon () {
        return this.downloadIcon.click();
    }

    isSocialIconDisplayed () {
        return this.socialIcon.isDisplayed();
    }

    clickSocialIcon () {
        return this.socialIcon.click();
    }

    areCourierLinksDisplayed () {
        return this.courierLinks.isDisplayed();
    }

    isCountrySelectorDisplayed () {
        return this.countrySelectorButton.isDisplayed();
    }

    clickCountrySelectorButton () {
        return this.countrySelectorButton.click();
    }

    isCountryLinkItemDisplayed () {
        return this.countryLink.isDisplayed();
    }

    clickCountryLinkItem () {
        return this.countryLink.click();
    }

    isCurrentCountryIconDisplayed (country) {
        const expectedIcon = this.currentFlagIcon.getAttribute('class').includes(`c-ficon--flag.${country}.round`);
        return expectedIcon ? this.currentFlagIcon.isDisplayed() : false;
    }
};
