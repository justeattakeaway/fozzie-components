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
    COUNTRY_LIST,
    PAYMENT_ICONS,
    FEEDBACK_BLOCK,
    FEEDBACK_BUTTON,
    FOOTER_LINK_LIST
} = require('./f-footer.selectors');

module.exports = class Footer extends Page {
    get component () { return $(FOOTER_COMPONENT); }

    get icons () { return $$(FOOTER_ICONS); }

    get downloadIcons () { return $$(DOWNLOAD_ICONS); }

    get downloadIconsBlock () { return $(DOWNLOAD_ICONS); }

    get socialIcons () { return $$(SOCIAL_ICONS); }

    get socialIconsBlock () { return $(SOCIAL_ICONS); }

    get paymentIconsBlock () { return $(PAYMENT_ICONS); }

    get courierLinks () { return $(COURIER_LINKS); }

    get downloadIcon () { return this.downloadIconValue; }

    get socialIcon () { return this.socialIconValue; }

    get feedbackBlock () { return $(FEEDBACK_BLOCK); }

    get feedbackButton () { return $(FEEDBACK_BUTTON); }

    get countrySelectorButton () { return $(COUNTRY_SELECTOR_BUTTON); }

    get currentFlagIcon () { return $(CURRENT_COUNTRY_ICON); }

    get currentCountryText () { return $(CURRENT_COUNTRY_TEXT); }

    get countries () { return $$(COUNTRY_LIST); }

    get footerLinkList () { return $(FOOTER_LINK_LIST); }

    get countryLink () { return this.countryValue != null ? this.countryValue : 'Please set a country value'; }

    set expectedDownloadIcon (icon) {
        this.downloadIconValue = this.downloadIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
    }

    set expectedSocialIcon (icon) {
        this.socialIconValue = this.socialIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
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

    isDownloadIconDisplayed () {
        return this.downloadIcon.isDisplayed();
    }

    isDownloadIconBlockDisplayed () {
        return this.downloadIconsBlock.isDisplayed();
    }

    clickDownloadIcon () {
        return this.downloadIcon.click();
    }

    isSocialIconDisplayed () {
        return this.socialIcon.isDisplayed();
    }

    isSocialIconBlockDisplayed () {
        return this.socialIconsBlock.isDisplayed();
    }

    isPaymentIconsBlockDisplayed () {
        return this.paymentIconsBlock.isDisplayed();
    }

    clickSocialIcon () {
        return this.socialIcon.click();
    }

    isFeedbackBlockDisplayed () {
        return this.feedbackBlock.isDisplayed();
    }

    isFeedbackButtonClickable () {
        return this.feedbackButton.isClickable();
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

    areFooterLinksDisplayed () {
        return this.footerLinkList.isDisplayedInViewport();
    }
};
