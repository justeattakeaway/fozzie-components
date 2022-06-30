const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-offers-selectors');

module.exports = class Offers extends Page {
    constructor () {
        super('page', 'v-offers-component');
    }

    get component () { return $(COMPONENT); }

    async load () {
        await super.load(this.component);
    }

    async open (url) {
        await super.open(url);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return (await this.component).isDisplayed();
    }
};
