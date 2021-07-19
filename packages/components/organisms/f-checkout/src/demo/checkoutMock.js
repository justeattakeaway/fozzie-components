import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getCheckoutDelivery from './checkout-delivery.json';
import getCheckoutDeliverySplitNotesDeliveryKitchen from './checkout-delivery-split-notes-delivery-kitchen.json';
import getCheckoutDeliverySplitNotesDelivery from './checkout-delivery-split-notes-delivery.json';
import getCheckoutDeliveryAsapUrl from './checkout-delivery-user-selected-asap.json';
import getCheckoutDeliveryLaterUrl from './checkout-delivery-user-selected-later.json';
import getCheckoutDeliveryUnavailableUrl from './checkout-delivery-user-selected-unavailable-time.json';
import getCheckoutCollection from './checkout-collection.json';
import getCheckoutCollectionAsapUrl from './checkout-collection-user-selected-asap.json';
import getCheckoutCollectionLaterUrl from './checkout-collection-user-selected-later.json';
import getCheckoutCollectionUnavailableUrl from './checkout-collection-user-selected-unavailable-time.json';
import getCheckoutDineIn from './checkout-dinein.json';
import checkoutAvailableFulfilment from './checkout-available-fulfilment.json';
import checkoutAvailableFulfilmentNoTimeAvailable from './checkout-available-fulfilment-no-time-available.json';
import checkoutAvailableFulfilmentPreorder from './checkout-available-fulfilment-preorder.json';
import createGuest from './create-guest.json';
import getBasketDelivery from './get-basket-delivery.json';
import getBasketCollection from './get-basket-collection.json';
import getBasketDineIn from './get-basket-dinein.json';
import updateCheckout from './update-checkout.json';
import updateCheckoutRestaurantNotTakingOrders from './update-checkout-restaurant-not-taking-orders.json';
import updateCheckoutAdditionalItemsRequired from './update-checkout-additional-items-required.json';
import updateCheckoutAccessForbidden from './update-checkout-403.json';
import updateCheckoutUnavailableTimeUrl from './update-checkout-time-unavailable.json';
import getAddress from './get-address.json';
import placeOrder from './place-order.json';
import placeOrderDuplicate from './place-order-duplicate.json';
import accessForbiddenError from './checkout-403-get-error.json';
import getCheckoutError from './checkout-500-get-error.json';
import getGeoLocation from './get-geo-location.json';
import getCustomer from './get-customer.json';

const mock = new MockAdapter(axios);

export default {
    setupCheckoutMethod (path) {
        switch (path) {
            case '/checkout-delivery.json':
                mock.onGet(path).reply(200, getCheckoutDelivery);
                break;
            case '/checkout-delivery-split-notes-delivery-kitchen.json':
                mock.onGet(path).reply(200, getCheckoutDeliverySplitNotesDeliveryKitchen);
                break;
            case '/checkout-delivery-split-notes-delivery.json':
                mock.onGet(path).reply(200, getCheckoutDeliverySplitNotesDelivery);
                break;
            case '/checkout-delivery-user-selected-asap.json':
                mock.onGet(path).reply(200, getCheckoutDeliveryAsapUrl);
                break;
            case '/checkout-delivery-user-selected-later.json':
                mock.onGet(path).reply(200, getCheckoutDeliveryLaterUrl);
                break;
            case '/checkout-delivery-user-selected-unavailable-time.json':
                mock.onGet(path).reply(200, getCheckoutDeliveryUnavailableUrl);
                break;
            case '/checkout-collection.json':
                mock.onGet(path).reply(200, getCheckoutCollection);
                break;
            case '/checkout-collection-user-selected-asap.json':
                mock.onGet(path).reply(200, getCheckoutCollectionAsapUrl);
                break;
            case '/checkout-collection-user-selected-later.json':
                mock.onGet(path).reply(200, getCheckoutCollectionLaterUrl);
                break;
            case '/checkout-collection-user-selected-unavailable-time.json':
                mock.onGet(path).reply(200, getCheckoutCollectionUnavailableUrl);
                break;
            case '/checkout-dinein.json':
                mock.onGet(path).reply(200, getCheckoutDineIn);
                break;
            case '/checkout-timeout-get-error.json':
                mock.onGet(path).timeout();
                break;
            case '/checkout-available-fulfilment.json':
                mock.onGet(path).reply(200, checkoutAvailableFulfilment);
                break;
            case '/checkout-available-fulfilment-no-time-available.json':
                mock.onGet(path).reply(200, checkoutAvailableFulfilmentNoTimeAvailable);
                break;
            case '/checkout-available-fulfilment-preorder.json':
                mock.onGet(path).reply(200, checkoutAvailableFulfilmentPreorder);
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
            case '/get-basket-dinein.json':
                mock.onGet(path).reply(200, getBasketDineIn);
                break;
            case '/get-basket-timeout.json':
                mock.onGet(path).timeout();
                break;
            case '/update-checkout.json':
                mock.onPatch(path).reply(200, updateCheckout);
                break;
            case '/update-checkout-restaurant-not-taking-orders.json':
                mock.onPatch(path).reply(200, updateCheckoutRestaurantNotTakingOrders);
                break;
            case '/update-checkout-additional-items-required.json':
                mock.onPatch(path).reply(200, updateCheckoutAdditionalItemsRequired);
                break;
            case '/update-checkout-403.json':
                mock.onPatch(path).reply(403, updateCheckoutAccessForbidden);
                break;
            case '/update-checkout-time-unavailable.json':
                mock.onPatch(path).reply(200, updateCheckoutUnavailableTimeUrl);
                break;
            case '/update-checkout-timeout.json':
                mock.onPatch(path).timeout();
                break;
            case '/get-address.json':
                mock.onGet(path).reply(200, getAddress);
                break;
            case '/place-order.json':
                mock.onPost(path).reply(200, placeOrder);
                break;
            case '/place-order-duplicate.json':
                mock.onPost(path).reply(400, placeOrderDuplicate);
                break;
            case '/place-order-timeout.json':
                mock.onPost(path).timeout();
                break;
            case '/checkout-403-get-error.json':
                mock.onGet(path).reply(403, accessForbiddenError);
                break;
            case '/checkout-500-get-error.json':
                mock.onGet(path).reply(500, getCheckoutError);
                break;
            case '/get-geo-location.json':
                mock.onPost(path).reply(200, getGeoLocation);
                break;
            case '/get-customer.json':
                mock.onGet(path).reply(200, getCustomer);
                break;
            default:
                throw new Error(`${path} is not valid`);
        }
    },

    passThroughAny () {
        mock.onAny().passThrough();
    }
};
