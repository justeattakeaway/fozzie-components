const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-restaurantCard-selectors');

module.exports = class RestaurantCard extends Page {
    constructor () {
        super('molecule', 'restaurant-card-component');
    }

    get component () { return $(COMPONENT); }

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
