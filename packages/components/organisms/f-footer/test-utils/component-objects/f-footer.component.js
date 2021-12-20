const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    FOOTER_COMPONENT,
    DOWNLOAD_ICONS,
    SOCIAL_ICONS,
    COUNTRY_SELECTOR_BUTTON,
    COUNTRY_LIST,
    FEEDBACK_BUTTON,
    FOOTER_LINK_LIST
} = require('./f-footer.selectors');

module.exports = class Footer extends Page {
    constructor () {
        super('organism', 'footer-component');
    }

    get component () { return $(FOOTER_COMPONENT); }

    get downloadIcons () { return $$(DOWNLOAD_ICONS); }

    get socialIcons () { return $$(SOCIAL_ICONS); }

    get downloadIcon () { return this.downloadIconValue; }

    get socialIcon () { return this.socialIconValue; }

    get feedbackButton () { return $(FEEDBACK_BUTTON); }

    get countrySelectorButton () { return $(COUNTRY_SELECTOR_BUTTON); }

    get countries () { return $$(COUNTRY_LIST); }

    get footerLinkList () { return $(FOOTER_LINK_LIST); }

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

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    clickDownloadIcon () {
        return this.downloadIcon.click();
    }

    clickSocialIcon () {
        return this.socialIcon.click();
    }

    isFeedbackButtonClickable () {
        return this.feedbackButton.isClickable();
    }

    clickCountrySelectorButton () {
        return this.countrySelectorButton.click();
    }

    clickCountryLinkItem () {
        return this.countryLink.click();
    }
};
