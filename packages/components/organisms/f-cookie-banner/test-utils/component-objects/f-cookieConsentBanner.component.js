const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

module.exports = class CookieBanner extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $('[data-test-id="cookieConsentBanner"]'); }

    get cookiePolicyLink () { return this.component.$('[data-test-id="cookie-policy-link"]'); }

    get cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get cookieAcceptAllButton () { return this.component.$('[data-test-id="accept-all-cookies-button"]'); }

    get cookieAcceptNecessaryButton () { return this.component.$('[data-test-id="accept-necessary-cookies-button"]'); }

    get componentContent () { return $('[data-test-id="cookieBannerContent"]'); }

    load () {
        this.open('/');
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        browser.deleteCookies();
        this.open(pageUrl);
        this.waitForComponent();
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

    isCookieBannerContentDisplayed () {
        return this.componentContent.isDisplayed();
    }

    isCookieBannerAcceptAllButtonDisplayed () {
        return this.cookieAcceptAllButton.isDisplayed();
    }

    isCookieBannerAcceptNecessaryButtonDisplayed () {
        return this.cookieAcceptNecessaryButton.isDisplayed();
    }

    clickCookiePolicyLink () {
        this.cookiePolicyLink.click();
    }


    acceptCookies (cookieType) {
        switch (cookieType.toLowerCase()) {
            case 'full':
                this.cookieAcceptAllButton.click();
                break;
            case 'necessary':
                this.cookieAcceptNecessaryButton.click();
                break;
            default:
                throw new Error(`${cookieType} is not a valid cookie type.`);
        }
        return this;
    }
};
