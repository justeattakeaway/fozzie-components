const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class CookieBanner extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get cookieBannerTitle () { return $('[data-test-id="cookieConsentTitle"]'); }

    get cookiePolicyLink () { return $('[data-test-id="cookie-policy-link"]'); }

    get cookieAcceptAllButton () { return $('[data-test-id="accept-all-cookies-button"]'); }

    get cookieAcceptNecessaryButton () { return $('[data-test-id="accept-necessary-cookies-button"]'); }

    async clickCookiePolicyLink () {
        (await this.cookiePolicyLink).click();
    }

    async acceptCookies (value) {
        const cookieType = {
            full: await this.cookieAcceptAllButton,
            necessary: await this.cookieAcceptNecessaryButton
        };

        return cookieType[value].click();
    }

    async getCookiePolicyUrl () {
        return (await this.cookiePolicyLink).getAttribute('href');
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
