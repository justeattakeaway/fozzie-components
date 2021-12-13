const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-form-selectors');

module.exports = class Form extends Page {
    constructor () {
        super('organism', 'form-component');
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
