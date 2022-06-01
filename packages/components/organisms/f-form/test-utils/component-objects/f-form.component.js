const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-form-selectors');

module.exports = class Form extends Page {
    constructor () {
        super('organism', 'v-form-component');
    }

    get component () {
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
