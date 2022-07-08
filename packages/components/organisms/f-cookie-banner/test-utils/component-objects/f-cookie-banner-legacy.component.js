import Page from '@justeat/f-wdio-utils';

class CookieBannerLegacy extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $('[data-test-id="legacyCookieBanner-component"]'); }

    get cookiePolicyLink () { return $('[data-test-id="cookie-policy-link"]'); }

    get closeButton () { return $('[data-test-id="cookieBanner-close-button"]'); }

    async cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    async clickCookiePolicyLink () { await this.cookiePolicyLink.click(); }

    async close () {
        await this.closeButton.click();
    }
}

export default new CookieBannerLegacy();
