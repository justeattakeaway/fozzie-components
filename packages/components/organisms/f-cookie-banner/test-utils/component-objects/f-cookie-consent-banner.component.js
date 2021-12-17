const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class CookieBanner extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $('[data-test-id="cookieConsentBanner"]'); }

    get cookiePolicyLink () { return this.component.$('[data-test-id="cookie-policy-link"]'); }

    get cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get cookieAcceptAllButton () { return this.component.$('[data-test-id="accept-all-cookies-button"]'); }

    get cookieAcceptNecessaryButton () { return this.component.$('[data-test-id="accept-necessary-cookies-button"]'); }

    load () {
        this.open('/');
        browser.deleteCookies();
        super.load(this.component);
    }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isCookieBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }

    clickCookiePolicyLink () {
        this.cookiePolicyLink.click();
    }

    acceptCookies (value) {
        const cookieType = {
            full: this.cookieAcceptAllButton,
            necessary: this.cookieAcceptNecessaryButton
        };

        return cookieType[value].click();
    }
};
