const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-<%= name.class %>-selectors')

module.exports = class <%= name.filename %> extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('<%= storybook.componentCategory.toLowerCase().slice(0, -1) %>', '<%= name.class %>-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
