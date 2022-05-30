const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    COOKIE_BANNER_COMPONENT,
    COOKIE_BANNER_TITLE,
    COOKIE_POLICY_LINK,
    COOKIE_ACCEPT_ALL_BUTTON,
    COOKIE_ACCEPT_NECESSARY_BUTTON
} = require('./f-cookie-banner-selectors');

module.exports = class CookieBanner extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $(COOKIE_BANNER_COMPONENT); }

    get cookieBannerTitle () { return $(COOKIE_BANNER_TITLE); }

    get cookiePolicyLink () { return $(COOKIE_POLICY_LINK); }

    get cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get cookieAcceptAllButton () { return $(COOKIE_ACCEPT_ALL_BUTTON); }

    get cookieAcceptNecessaryButton () { return $(COOKIE_ACCEPT_NECESSARY_BUTTON); }

    async load () {
        await this.open('/');
        await browser.deleteCookies();
        await super.load(this.component);
    }

    async open (url) {
        await super.open(url);
    }

    async waitForComponent () {
        await this.component.waitForExist();
    }

    async isCookieBannerComponentDisplayed () {
        const component = await this.component;
        const isDisplayed = await component.isDisplayed();
        return isDisplayed;
    }

    async clickCookiePolicyLink () {
        const cookiePolicyLink = await this.cookiePolicyLink;
        await cookiePolicyLink.click();
    }

    async acceptCookies (value) {
        const cookieType = {
            full: await this.cookieAcceptAllButton,
            necessary: await this.cookieAcceptNecessaryButton
        };

        return cookieType[value].click();
    }

    async testTabOrder (tabOrder) {
        const tabOrderResult = await super.testTabOrder(tabOrder);
        const expectedTabOrder = await Promise.all(tabOrder.map(async el => ({
            selector: await el.getAttribute('data-test-id'),
            isFocused: true
        })));
        return {
            actual: tabOrderResult,
            expected: expectedTabOrder.concat(expectedTabOrder[0])
        };
    }
};
