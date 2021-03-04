const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class StatusBanner extends Page {

    get component () { return $('[data-test-id="main-banner-container"]') }


    open() {
        super.openComponent('organism', 'status-banner-component');
    };

    waitForComponent() {
        this.component.waitForExist();
    }

    isStatusBannerComponentDisplayed() {
        return this.component.isDisplayed();
    }
}
