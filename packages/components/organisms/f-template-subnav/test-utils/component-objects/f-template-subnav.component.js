/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-template-subnav-selectors');

module.exports = class TemplateSubNav extends Page {
    constructor () {
        super('organisms', 'template-subnav-component');
    }

    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
