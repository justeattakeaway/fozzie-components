const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');

module.exports = class Tabs extends Page {
    constructor() {
        super('molecule', 'vue-tabs-component');
    }

    get component () { return $('[data-test-id="tabs-component"]'); }

    get tabButtons () { return $$('[data-test-id*="tab-button"]'); }

    load () {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        this.open(pageUrl);
        this.waitForComponent();
    }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isTabButtonDisplayed () {
        return this.tabButton.isDisplayed();
    }

    set expectedTabButton (tabTitle) {
        this.tabButtonValue = this.tabButtons.filter(element => element.getText().includes(tabTitle))[0];
    }

    get tabButton () { return this.tabButtonValue != null ? this.tabButtonValue : 'Please set an expected tab button value'; }
};
