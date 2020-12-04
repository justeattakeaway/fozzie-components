import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import checkoutDelivery from './checkout-delivery.json';
import checkoutCollection from './checkout-collection.json';
import restaurant from './restaurant.json';
import restaurantMcDonalds from './restaurant-mcdonalds.json';

const mock = new MockAdapter(axios);

export default {
    setupDelivery (path) {
        mock.onGet(path).reply(200, checkoutDelivery);
    },

    setupCollection (path) {
        mock.onGet(path).reply(200, checkoutCollection);
    },

    setupRestaurant (path) {
        mock.onGet(path).reply(200, restaurant);
    },

    setupRestaurantMcDonalds (path) {
        mock.onGet(path).reply(200, restaurantMcDonalds);
    }
};
