import checkoutDelivery from './checkout-delivery.json';
import checkoutDeliveryUserSelectedAsap from './checkout-delivery-user-selected-asap.json';
import checkoutDeliveryUserSelectedLater from './checkout-delivery-user-selected-later.json';
import checkoutDeliveryUserSelectedUnavailableTime from './checkout-delivery-user-selected-unavailable-time.json';
import checkoutCollection from './checkout-collection.json';
import checkoutCollectionUserSelectedAsap from './checkout-collection-user-selected-asap.json';
import checkoutCollectionUserSelectedLater from './checkout-collection-user-selected-later.json';
import checkoutCollectionUserSelectedUnavailableTime from './checkout-collection-user-selected-unavailable-time.json';
import checkoutDinein from './checkout-dinein.json';
import checkoutAvailableFulfilment from './checkout-available-fulfilment.json';
import checkoutAvailableFulfilmentNoTimeAvailable from './checkout-available-fulfilment-no-time-available.json';
import checkoutAvailableFulfilmentPreorder from './checkout-available-fulfilment-preorder.json';
import createGuest from './create-guest.json';
import getBasketDelivery from './get-basket-delivery.json';
import getBasketCollection from './get-basket-collection.json';
import getBasketDinein from './get-basket-dinein.json';
import updateCheckout from './update-checkout.json';
import updateCheckoutRestaurantNotTakingOrders from './update-checkout-restaurant-not-taking-orders.json';
import updateCheckoutAdditionalItemsRequired from './update-checkout-additional-items-required.json';
import updateCheckout403 from './update-checkout-403.json';
import updateCheckoutTimeUnavailable from './update-checkout-time-unavailable.json';
import getAddress from './get-address.json';
import placeOrder from './place-order.json';
import placeOrderDuplicate from './place-order-duplicate.json';
import checkout403GetError from './checkout-403-get-error.json';
import checkout500GetError from './checkout-500-get-error.json';
import getGeoLocation from './get-geo-location.json';
import getCustomer from './get-customer.json';

const httpStatusCodes = {
    noResponse: 0,
    ok: 200,
    badRequest: 400,
    forbidden: 403,
    internalServerError: 500
};

const httpMethods = {
    get: 'get',
    post: 'post',
    patch: 'patch'
};

const requestDefinitions = {
    checkoutDelivery: {
        url: '/checkout-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDelivery
    },
    checkoutDeliveryUserSelectedAsap: {
        url: '/checkout-delivery-user-selected-asap.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDeliveryUserSelectedAsap
    },
    checkoutDeliveryUserSelectedLater: {
        url: '/checkout-delivery-user-selected-later.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDeliveryUserSelectedLater
    },
    checkoutDeliveryUserSelectedUnavailableTime: {
        url: '/checkout-delivery-user-selected-unavailable-time.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDeliveryUserSelectedUnavailableTime
    },
    checkoutCollection: {
        url: '/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollection
    },
    checkoutCollectionUserSelectedAsap: {
        url: '/checkout-collection-user-selected-asap.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollectionUserSelectedAsap
    },
    checkoutCollectionUserSelectedLater: {
        url: '/checkout-collection-user-selected-later.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollectionUserSelectedLater
    },
    checkoutCollectionUserSelectedUnavailableTime: {
        url: '/checkout-collection-user-selected-unavailable-time.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollectionUserSelectedUnavailableTime
    },
    checkoutDinein: {
        url: '/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDinein
    },
    checkoutTimeoutGetError: {
        url: '/checkout-timeout-get-error.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.noResponse
    },
    checkoutAvailableFulfilment: {
        url: '/checkout-available-fulfilment.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutAvailableFulfilment
    },
    checkoutAvailableFulfilmentNoTimeAvailable: {
        url: '/checkout-available-fulfilment-no-time-available.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutAvailableFulfilmentNoTimeAvailable
    },
    checkoutAvailableFulfilmentPreorder: {
        url: '/checkout-available-fulfilment-preorder.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutAvailableFulfilmentPreorder
    },
    createGuest: {
        url: '/create-guest.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.ok,
        payload: createGuest
    },
    getBasketDelivery: {
        url: '/get-basket-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasketDelivery
    },
    getBasketCollection: {
        url: '/get-basket-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasketCollection
    },
    getBasketDinein: {
        url: '/get-basket-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasketDinein
    },
    getBasketTimeout: {
        url: '/get-basket-timeout.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.noResponse
    },
    updateCheckout: {
        url: '/update-checkout.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckout
    },
    updateCheckoutRestaurantNotTakingOrders: {
        url: '/update-checkout-restaurant-not-taking-orders.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckoutRestaurantNotTakingOrders
    },
    updateCheckoutAdditionalItemsRequired: {
        url: '/update-checkout-additional-items-required.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckoutAdditionalItemsRequired
    },
    updateCheckout403: {
        url: '/update-checkout-403.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.forbidden,
        payload: updateCheckout403
    },
    updateCheckoutTimeUnavailable: {
        url: '/update-checkout-time-unavailable.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckoutTimeUnavailable
    },
    updateCheckoutTimeout: {
        url: '/update-checkout-timeout.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.noResponse
    },
    getAddress: {
        url: '/get-address.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getAddress
    },
    placeOrder: {
        url: '/place-order.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.ok,
        payload: placeOrder
    },
    placeOrderDuplicate: {
        url: '/place-order-duplicate.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.badRequest, // TODO: DJB this should be a 409
        payload: placeOrderDuplicate
    },
    placeOrderTimeout: {
        url: '/place-order-timeout.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.noResponse
    },
    checkout403GetErrorJson: {
        url: '/checkout-403-get-error.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.forbidden,
        payload: checkout403GetError
    },
    checkout500GetError: {
        url: '/checkout-500-get-error.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkout500GetError
    },
    getGeoLocation: {
        url: '/get-geo-location.json',
        method: httpMethods.post, // TODO:  DJB Why is this a POST?
        responseStatus: httpStatusCodes.ok,
        payload: getGeoLocation
    },
    getCustomer: {
        url: '/get-customer.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCustomer
    }
};

export {
    requestDefinitions as default,
    httpMethods,
    httpStatusCodes
};
