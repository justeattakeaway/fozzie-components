const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class RestaurantCard extends Page {
    constructor () {
        super('molecule-folder', 'f-restaurant-card--restaurant-card-component');
    }

    get component () { return $('[data-test-id="restaurant"]'); }

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
