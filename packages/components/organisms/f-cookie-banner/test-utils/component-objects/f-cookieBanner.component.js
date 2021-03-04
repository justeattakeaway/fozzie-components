const Page = require('@justeat/f-wdio-utils/src/page.object');

class CookieBanner extends Page {

    get component () { return $('[data-test-id="cookieBanner-component"]')}

    open() {
        super.openComponent('organism', 'cookie-banner-component');
    }

    waitForComponent() {
        this.component.waitForExist();
    }

    isCookieBannerComponentDisplayed() {
        return this.component.isDisplayed();
    }
}

module.exports = CookieBanner;
