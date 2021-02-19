import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getCheckoutDelivery from './checkout-delivery.json';
import getCheckoutCollection from './checkout-collection.json';
import checkoutAvailableFulfilment from './checkout-available-fulfilment.json';
import createGuest from './create-guest.json';
import getBasketDelivery from './get-basket-delivery.json';
import getBasketCollection from './get-basket-collection.json';
import updateCheckout from './update-checkout.json';
import getAddress from './get-address.json';

const mock = new MockAdapter(axios);

export default {
    setupCheckoutMethod (path) {
        switch (path) {
            case '/checkout-delivery.json':
                mock.onGet(path).reply(200, getCheckoutDelivery);
                break;
            case '/checkout-collection.json':
                mock.onGet(path).reply(200, getCheckoutCollection);
                break;
            case '/checkout-available-fulfilment.json':
                mock.onGet(path).reply(200, checkoutAvailableFulfilment);
                break;
            case '/create-guest.json':
                mock.onPost(path).reply(200, createGuest);
                break;
            case '/get-basket-delivery.json':
                mock.onGet(path).reply(200, getBasketDelivery);
                break;
            case '/get-basket-collection.json':
                mock.onGet(path).reply(200, getBasketCollection);
                break;
            case '/update-checkout.json':
                mock.onPatch(path).reply(200, updateCheckout);
                break;
            case '/get-address.json':
                mock.onGet(path).reply(200, getAddress);
                break;
            default:
                throw new Error(`${path} is not valid`);
        }
    },

    passThroughAny () {
        mock.onAny().passThrough();
    }
};
