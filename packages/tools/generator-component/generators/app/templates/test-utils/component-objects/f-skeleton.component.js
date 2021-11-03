const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-<%= name.class %>-selectors');

module.exports = class <%= name.filename %> extends Page {
    constructor () {
        super('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', '<%= name.default %>-component');
    }

    // eslint-disable-next-line class-methods-use-this
    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

    load () {
        super.load(this.component);
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
};
