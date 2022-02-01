const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-<%= name.default %>-selectors');

module.exports = class <%= name.filename %> extends Page {
    constructor () {
        super('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', '<%= name.default %>-component');
    }

    get component () {
        return $(COMPONENT);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
