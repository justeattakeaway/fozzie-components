const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class RestaurantCard extends Page {
    constructor () {
        super('molecule-folder', 'f-restaurant-card--restaurant-card-component');
    }
};
