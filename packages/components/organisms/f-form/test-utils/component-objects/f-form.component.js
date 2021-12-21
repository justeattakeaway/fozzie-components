const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-form-selectors');

module.exports = class Form extends Page {
    constructor () {
        super('organism', 'v-form-component');
    }

    get component () {
        return $(COMPONENT);
    }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
