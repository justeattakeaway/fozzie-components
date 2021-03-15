const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    FOOTER_COMPONENT,
    FOOTER_ICONS,
    DOWNLOAD_ICONS,
    COURIER_LINKS,
    SOCIAL_ICONS
} = require('./f-footer.selectors');

module.exports = class Footer extends Page {
    get component () { return $(FOOTER_COMPONENT); }

    get icons () { return $$(FOOTER_ICONS); }

    get downloadIcons () { return $$(DOWNLOAD_ICONS); }

    get socialIcons () { return $$(SOCIAL_ICONS); }

    get courierLinks () { return $(COURIER_LINKS); }

    get downloadIcon () { return this.downloadIconValue; }

    get socialIcon () { return this.socialIconValue; }

    set expectedDownloadIcon (icon) {
        this.downloadIconValue = this.downloadIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
    }

    set expectedSocialIcon (icon) {
        this.socialIconValue = this.socialIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
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
        const countryFormatted = footer.locale.toUpperCase();
        const showCountrySelector = footer.countrySelector ? '&knob-Show%20country%20selector=true' : '';
        const showCourierLinks = footer.courierLinks ? '&knob-Show%20country%20selector=true' : '';
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

        const url = `footer-component&knob-Locale=${formattedLocale}${showCountrySelector}${showCourierLinks}`
        super.openComponent('organism', url);
    }


    // openAUWithExtraFeatures () {
    //     super.openComponent('organism', 'footer-component&knob-Show%20courier%20links=true&knob-Locale=en-AU');
    // }

    // openGBWithExtraFeatures () {
    //     super.openComponent('organism', 'footer-component&knob-Show%20courier%20links=true&knob-Locale=en-GB');
    // }

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
};
