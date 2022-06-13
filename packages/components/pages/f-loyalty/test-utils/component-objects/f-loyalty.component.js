const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-loyalty-selectors');

module.exports = class Loyalty extends Page {
    constructor () {
        super('page', 'v-loyalty-component');
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
