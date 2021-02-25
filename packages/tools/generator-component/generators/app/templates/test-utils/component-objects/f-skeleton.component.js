const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-<%= name.class %>-selectors')

module.exports = class <%= name.filename %> extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('<%= storybook.componentCategory.toLowerCase().replace('s','') %>', '<%= name.class %>-component');
    }

    waitForTestComponent () 
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        this.component.isDisplayed();
    }
}
