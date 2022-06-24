const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class CookieBannerLegacy extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $('[data-test-id="legacyCookieBanner-component"]'); }

    get cookiePolicyLink () { return $('[data-test-id="cookie-policy-link"]'); }

    get cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get closeButton () { return $('[data-test-id="cookieBanner-close-button"]'); }

    clickCookiePolicyLink () { this.cookiePolicyLink.click(); }

    close () {
        this.closeButton.click();

        return this;
    }
};
