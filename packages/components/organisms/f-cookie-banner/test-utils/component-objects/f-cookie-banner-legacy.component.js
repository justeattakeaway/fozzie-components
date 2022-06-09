const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class CookieBanner extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $('[data-test-id="legacyCookieBanner-component"]'); }

    get cookiePolicyLink () { return $('[data-test-id="cookie-policy-link"]'); }

    get cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get closeButton () { return $('[data-test-id="cookieBanner-close-button"]'); }

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
        return this.component.isDisplayed();
    }

    async clickCookiePolicyLink () {
        const cookiePolicyLink = await this.cookiePolicyLink;
        await cookiePolicyLink.click();
    }

    async close () {
        await this.closeButton.click();

        return this;
    }
};
