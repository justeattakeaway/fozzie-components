const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-filter-pill-selectors');

module.exports = class FilterPill extends Page {
    constructor () {
        super('atom', 'filter-pill-component');
    }

    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
