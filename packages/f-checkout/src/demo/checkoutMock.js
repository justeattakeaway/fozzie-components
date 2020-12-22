import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import checkoutDelivery from './checkout-delivery.json';
import checkoutCollection from './checkout-collection.json';
import checkoutAvailableFulfilment from './checkout-available-fulfilment.json';

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
            case '/checkout-available-fulfilment.json':
                mock.onGet(path).reply(200, checkoutAvailableFulfilment);
                break;
            default:
                throw new Error(`${path} is not valid`);
        }
    }
};
