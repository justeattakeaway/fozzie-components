import Page from '@justeat/f-wdio-utils';

class RestaurantCard extends Page {
    constructor () {
        super('molecule-folder', 'f-restaurant-card--restaurant-card-component');
    }
}

export default new RestaurantCard();
