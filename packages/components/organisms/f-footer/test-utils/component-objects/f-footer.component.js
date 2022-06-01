const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    FOOTER_COMPONENT,
    COUNTRY_SELECTOR_BUTTON,
    COUNTRY_LINK,
    FEEDBACK_BUTTON,
    FOOTER_ICON,
    FOOTER_LINK_LIST
} = require('./f-footer.selectors');

module.exports = class Footer extends Page {
    constructor () {
        super('organism', 'footer-component');
    }

    get component () { return $(FOOTER_COMPONENT); }

    get feedbackButton () { return $(FEEDBACK_BUTTON); }

    get countrySelectorButton () { return $(COUNTRY_SELECTOR_BUTTON); }

    get footerLinkList () { return $(FOOTER_LINK_LIST); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async clickIcon (icon) {
        const footerIcon = await $(`[${FOOTER_ICON}${icon}"]`);

        return footerIcon.click();
    }

    async isFeedbackButtonClickable () {
        return this.feedbackButton.isClickable();
    }

    async clickCountrySelectorButton () {
        const countrySelectorButton = await this.countrySelectorButton;
        return countrySelectorButton.click();
    }

    async clickCountryLinkItem (country) {
        const countryLink = await $(`[${COUNTRY_LINK}${country}"]`);

        return countryLink.click();
    }
};
