const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-<%= name.default %>-selectors');

module.exports = class <%= name.filename %> extends Page {
    constructor () {
        super('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', 'v-<%= name.default %>-component');
    }

    get component () {
        return $(COMPONENT);
    }

    async waitForComponent () {
        super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
