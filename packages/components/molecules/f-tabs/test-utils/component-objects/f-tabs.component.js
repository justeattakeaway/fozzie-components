import Page from '@justeat/f-wdio-utils';

class Tabs extends Page {
    constructor () {
        super('molecule', 'vue-tabs-component');
    }

    get tabButtons () { return $$('[data-test-id*="tab-button"]'); }

    async isTabButtonDisplayed (tabTitle) {
        return this.tabButtons.find(async element => (await element.getText() === tabTitle)).isDisplayed();
    }
}

export default new Tabs();
