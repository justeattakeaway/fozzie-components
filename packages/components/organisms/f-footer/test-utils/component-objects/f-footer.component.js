import Page from '@justeat/f-wdio-utils';
import {
    COUNTRY_SELECTOR_BUTTON,
    COUNTRY_LINK,
    FEEDBACK_BUTTON,
    FOOTER_ICON,
    FOOTER_LINK_LIST
} from './f-footer.selectors';

class Footer extends Page {
    constructor () {
        super('organism', 'footer-component');
    }

    get feedbackButton () { return $(FEEDBACK_BUTTON); }

    get countrySelectorButton () { return $(COUNTRY_SELECTOR_BUTTON); }

    get footerLinkList () { return $(FOOTER_LINK_LIST); }

    async clickIcon (icon) {
        const footerIcon = await $(`[${FOOTER_ICON}${icon}"]`);
        await footerIcon.waitForClickable();
        await footerIcon.click();
    }

    async isFeedbackButtonClickable () {
        return this.feedbackButton.isClickable();
    }

    async clickCountrySelectorButton () {
        await this.countrySelectorButton.click();
    }

    async clickCountryLinkItem (country) {
        const countryLink = await $(`[${COUNTRY_LINK}${country}"]`);

        await countryLink.click();
    }
}

export default new Footer();
