import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import getCheckoutDelivery from './checkout-delivery.json';
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
import getBasketDeliveryAgeRestricted from './get-basket-delivery-age-restriction.json';
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

function setupCheckoutMethod (path) {
    const httpStatusCodes = {
        noResponse: 0,
        ok: 200,
        badRequest: 400,
        forbidden: 403,
        internalServerError: 500
    };

    switch (path) {
        case '/checkout-delivery.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutDelivery);
            break;
        case '/checkout-delivery-user-selected-asap.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutDeliveryAsapUrl);
            break;
        case '/checkout-delivery-user-selected-later.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutDeliveryLaterUrl);
            break;
        case '/checkout-delivery-user-selected-unavailable-time.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutDeliveryUnavailableUrl);
            break;
        case '/checkout-collection.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutCollection);
            break;
        case '/checkout-collection-user-selected-asap.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutCollectionAsapUrl);
            break;
        case '/checkout-collection-user-selected-later.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutCollectionLaterUrl);
            break;
        case '/checkout-collection-user-selected-unavailable-time.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutCollectionUnavailableUrl);
            break;
        case '/checkout-dinein.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCheckoutDineIn);
            break;
        case '/checkout-timeout-get-error.json':
            mock.onGet(path).timeout();
            break;
        case '/checkout-available-fulfilment.json':
            mock.onGet(path).reply(httpStatusCodes.ok, checkoutAvailableFulfilment);
            break;
        case '/checkout-available-fulfilment-no-time-available.json':
            mock.onGet(path).reply(httpStatusCodes.ok, checkoutAvailableFulfilmentNoTimeAvailable);
            break;
        case '/checkout-available-fulfilment-preorder.json':
            mock.onGet(path).reply(httpStatusCodes.ok, checkoutAvailableFulfilmentPreorder);
            break;
        case '/create-guest.json':
            mock.onPost(path).reply(httpStatusCodes.ok, createGuest);
            break;
        case '/get-basket-delivery.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getBasketDelivery);
            break;
        case '/get-basket-collection.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getBasketCollection);
            break;
        case '/get-basket-dinein.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getBasketDineIn);
            break;
        case '/get-basket-delivery-age-restriction.json':
            mock.onGet(path).reply(200, getBasketDeliveryAgeRestricted);
            break;
        case '/get-basket-timeout.json':
            mock.onGet(path).timeout();
            break;
        case '/update-checkout.json':
            mock.onPatch(path).reply(httpStatusCodes.ok, updateCheckout);
            break;
        case '/update-checkout-restaurant-not-taking-orders.json':
            mock.onPatch(path).reply(httpStatusCodes.ok, updateCheckoutRestaurantNotTakingOrders);
            break;
        case '/update-checkout-additional-items-required.json':
            mock.onPatch(path).reply(httpStatusCodes.ok, updateCheckoutAdditionalItemsRequired);
            break;
        case '/update-checkout-403.json':
            mock.onPatch(path).reply(httpStatusCodes.forbidden, updateCheckoutAccessForbidden);
            break;
        case '/update-checkout-time-unavailable.json':
            mock.onPatch(path).reply(httpStatusCodes.ok, updateCheckoutUnavailableTimeUrl);
            break;
        case '/update-checkout-timeout.json':
            mock.onPatch(path).timeout();
            break;
        case '/get-address.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getAddress);
            break;
        case '/place-order.json':
            mock.onPost(path).reply(httpStatusCodes.ok, placeOrder);
            break;
        case '/place-order-duplicate.json':
            mock.onPost(path).reply(httpStatusCodes.badRequest, placeOrderDuplicate);
            break;
        case '/place-order-timeout.json':
            mock.onPost(path).timeout();
            break;
        case '/checkout-403-get-error.json':
            mock.onGet(path).reply(httpStatusCodes.forbidden, accessForbiddenError);
            break;
        case '/checkout-500-get-error.json':
            mock.onGet(path).reply(httpStatusCodes.internalServerError, getCheckoutError);
            break;
        case '/get-geo-location.json':
            mock.onPost(path).reply(httpStatusCodes.ok, getGeoLocation);
            break;
        case '/get-customer.json':
            mock.onGet(path).reply(httpStatusCodes.ok, getCustomer);
            break;
        default:
            throw new Error(`${path} is not valid`);
    }
}

function setupCheckoutMethods (urls) {
    for (const [, url] of Object.entries(urls)) {
        console.log(url);
        setupCheckoutMethod(url);
    }
    mock.onAny().passThrough();
}

export default setupCheckoutMethods;
