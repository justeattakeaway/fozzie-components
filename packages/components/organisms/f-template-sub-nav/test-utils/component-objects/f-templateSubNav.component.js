const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-templateSubNav-selectors');

module.exports = class TemplateSubNav extends Page {
    constructor () {
        super('organism', 'template-sub-nav-component');
    }

    // eslint-disable-next-line class-methods-use-this
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
