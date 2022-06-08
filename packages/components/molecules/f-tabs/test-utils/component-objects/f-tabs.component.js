const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class Tabs extends Page {
    constructor () {
        super('molecule', 'vue-tabs-component');
    }

    get tabButtons () { return $$('[data-test-id*="tab-button"]'); }

    async isTabButtonDisplayed () {
        return this.tabButton.isDisplayed();
    }

    set expectedTabButton (tabTitle) {
        [this.tabButtonValue] = this.tabButtons.filter(element => element.getText().includes(tabTitle));
    }

    get tabButton () { return this.tabButtonValue != null ? this.tabButtonValue : 'Please set an expected tab button value'; }
};
