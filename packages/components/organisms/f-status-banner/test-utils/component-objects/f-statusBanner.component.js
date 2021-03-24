const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class StatusBanner extends Page {
    get component () { return $('[data-test-id="main-banner-container"]'); }


    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isStatusBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
