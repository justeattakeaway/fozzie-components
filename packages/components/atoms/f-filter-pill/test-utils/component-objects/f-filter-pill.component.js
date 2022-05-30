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

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
