const Page = require('@justeat/f-wdio-utils/src/page.object');

class CookieBanner extends Page {
    get component () { return $('[data-test-id="legacyCookieBanner-component"]'); }

    get cookiePolicyLink () { return this.component.$('[data-test-id="cookie-policy-link"]'); }

    get policyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get closeButton () { return this.component.$('[data-test-id="cookieBanner-close-button"]'); }

    open (tenant = 'en-gb') {
        super.openComponent('organism', `cookie-banner-component&knob-Locale=en-${tenant.toUpperCase()}`);
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

    close () {
        this.closeButton.click();

        return this;
    }
};

export default new CookieBanner();
