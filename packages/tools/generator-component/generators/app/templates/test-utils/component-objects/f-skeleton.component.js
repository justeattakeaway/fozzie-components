const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-<%= name.class %>-selectors');

module.exports = class <%= name.filename %> extends Page {
    // eslint-disable-next-line class-methods-use-this
    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

    open () {
        super.openComponent('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', '<%= name.class %>-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
