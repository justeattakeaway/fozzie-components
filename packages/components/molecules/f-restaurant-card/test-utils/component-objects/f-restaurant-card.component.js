const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class RestaurantCard extends Page {
    constructor () {
        super('molecule-folder', 'f-restaurant-card--restaurant-card-component');
    }

    get component () { return $('[data-test-id="restaurant"]'); }

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
