const Page = require('@justeat/f-wdio-utils/src/page.object');

const {
    COMPONENT,
    ADDRESS_BOX,
    BUTTON
} = require('./f-statusBanner.selectors');


module.exports = class StatusBanner extends Page {
    get component () { return $(COMPONENT); }
    get address_box () { return $(ADDRESS_BOX); }
    get button () { return $(BUTTON); }

    open () {
        super.openComponent('organism', 'status-banner-component');
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isStatusBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
