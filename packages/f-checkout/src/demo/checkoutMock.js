import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import checkoutDelivery from './checkout-delivery.json';
import checkoutCollection from './checkout-collection.json';
import restaurant from './restaurant.json';
import restaurantMcDonalds from './restaurant-mcdonalds.json';

const mock = new MockAdapter(axios);

export default {
    setupCheckoutMethod (path) {
        switch (path) {
            case '/checkout-delivery.json':
                mock.onGet(path).reply(200, checkoutDelivery);
                break;
            case '/checkout-collection.json':
                mock.onGet(path).reply(200, checkoutCollection);
                break;
            default:
                throw new Error(`${path} is not valid`);
        }
    },

    setupRestaurant (path) {
        switch (path) {
            case '/restaurant.json':
                mock.onGet(path).reply(200, restaurant);
                break;
            case '/restaurant-mcdonalds.json':
                mock.onGet(path).reply(200, restaurantMcDonalds);
                break;
            default:
                throw new Error(`${path} is not valid`);
        }
    }
};
