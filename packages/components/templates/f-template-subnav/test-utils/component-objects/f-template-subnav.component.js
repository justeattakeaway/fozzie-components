/* eslint-disable class-methods-use-this */
const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class TemplateSubNav extends Page {
    constructor () {
        super('template', 'template-subnav-component');
    }

    get component () {
        return $('[data-test-id="templateSubNav"]');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
