const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-restaurantCard-selectors');

module.exports = class RestaurantCard extends Page {
    constructor () {
        super('molecule', 'restaurant-card-component');
    }

    // eslint-disable-next-line class-methods-use-this
    get component () {
        // eslint-disable-next-line no-undef
        return $(COMPONENT);
    }

    load () {
        super.load(this.component);
    }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
};
