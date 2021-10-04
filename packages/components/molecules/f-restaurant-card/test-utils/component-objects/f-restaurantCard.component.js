const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-restaurantCard-selectors')

module.exports = class RestaurantCard extends Page {

    get component () { return $(COMPONENT); }

    open () {
        super.openComponent('molecule', 'restaurantCard-component');
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}
