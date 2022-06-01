const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class CookieBanner extends Page {
    get component () { return $('[data-test-id="cookieBanner-component"]'); }

    async open (url) {
        await super.open(url);
    }

    async waitForComponent () {
        await this.component.waitForExist();
    }

    async isCookieBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
