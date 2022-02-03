import checkoutDeliveryUk from './uk/checkout-delivery.json';
import checkoutDeliveryAu from './au/checkout-delivery.json';
import checkoutDeliveryNz from './nz/checkout-delivery.json';
import checkoutWithDeliveryAndKitchenNoteTypes from './uk/checkout-delivery-split-notes-courier-kitchen.json';
import checkoutWithDeliveryNoteType from './uk/checkout-delivery-split-notes-courier.json';
import checkoutDeliveryUserSelectedAsap from './checkout-delivery-user-selected-asap.json';
import checkoutDeliveryUserSelectedLater from './checkout-delivery-user-selected-later.json';
import checkoutDeliveryUserSelectedUnavailableTime from './checkout-delivery-user-selected-unavailable-time.json';
import checkoutCollectionUk from './uk/checkout-collection.json';
import checkoutCollectionAu from './au/checkout-collection.json';
import checkoutCollectionNz from './nz/checkout-collection.json';
import checkoutCollectionUserSelectedAsap from './checkout-collection-user-selected-asap.json';
import checkoutCollectionUserSelectedLater from './checkout-collection-user-selected-later.json';
import checkoutCollectionUserSelectedUnavailableTime from './checkout-collection-user-selected-unavailable-time.json';
import checkoutDineinUk from './uk/checkout-dinein.json';
import checkoutDineinAu from './au/checkout-dinein.json';
import checkoutDineinNz from './nz/checkout-dinein.json';
import checkoutAvailableFulfilment from './checkout-available-fulfilment.json';
import checkoutAvailableFulfilmentNoTimeAvailable from './checkout-available-fulfilment-no-time-available.json';
import checkoutAvailableFulfilmentPreorder from './checkout-available-fulfilment-preorder.json';
import checkoutAvailableFulfilmentIssues from './checkout-available-fulfilment-issues.json';
import createGuest from './create-guest.json';
import createGuestError from './create-guest-error.json';
import getBasketDelivery from './get-basket-delivery.json';
import getBasketCollection from './get-basket-collection.json';
import getBasketDinein from './get-basket-dinein.json';
import getBasketInvalidProducts from './get-basket-invalid-products.json';
import getBasketOfflineProducts from './get-basket-offline-products.json';
import updateCheckout from './update-checkout.json';
import updateCheckoutRestaurantNotTakingOrders from './update-checkout-restaurant-not-taking-orders.json';
import updateCheckoutServiceTypeUnavailable from './update-checkout-service-type-unavailable.json';
import updateCheckoutAdditionalItemsRequired from './update-checkout-additional-items-required.json';
import updateCheckout403 from './update-checkout-403.json';
import updateCheckoutTimeUnavailable from './update-checkout-time-unavailable.json';
import updateCheckoutGeolocationRequired from './update-checkout-geolocation-required.json';
import getAddressUK from './uk/get-address.json';
import getAddressAU from './au/get-address.json';
import placeOrder from './place-order.json';
import placeOrderDuplicate from './place-order-duplicate.json';
import checkout403GetError from './checkout-403-get-error.json';
import checkout500GetError from './checkout-500-get-error.json';
import getGeoLocation from './get-geo-location.json';
import getCustomer from './get-customer.json';
import getBasketDeliveryAgeRestricted from './get-basket-delivery-age-restriction.json';
import splitNotesConfig from './get-notes-config-split.json';
import nonSplitNotesConfig from './get-notes-config.json';

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
    checkoutDeliveryUk: {
        url: '/uk/checkout-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDeliveryUk
    },
    checkoutDeliverySplitNotesKitchenAndCourier: {
        url: '/uk/checkout-delivery-split-notes-courier-kitchen.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutWithDeliveryAndKitchenNoteTypes
    },
    checkoutDeliverySplitNotesCourier: {
        url: '/uk/checkout-delivery-split-notes-courier.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutWithDeliveryNoteType
    },
    checkoutDeliveryAu: {
        url: '/au/checkout-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDeliveryAu
    },
    checkoutDeliveryNz: {
        url: '/nz/checkout-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDeliveryNz
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
    checkoutCollectionUk: {
        url: '/uk/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollectionUk
    },
    checkoutCollectionAu: {
        url: '/au/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollectionAu
    },
    checkoutCollectionNz: {
        url: '/nz/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutCollectionNz
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
    checkoutDineinUk: {
        url: '/uk/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDineinUk
    },
    checkoutDineinAu: {
        url: '/au/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDineinAu
    },
    checkoutDineinNz: {
        url: '/nz/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutDineinNz
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
    checkoutAvailableFulfilmentIssues: {
        url: '/checkout-available-fulfilment-issues.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: checkoutAvailableFulfilmentIssues
    },
    createGuest: {
        url: '/create-guest.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.ok,
        payload: createGuest
    },
    createGuestError: {
        url: '/create-guest-error.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.badRequest,
        payload: createGuestError
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
    getBasketInvalidProducts: {
        url: '/get-basket-invalid-products.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasketInvalidProducts
    },
    getBasketOfflineProducts: {
        url: '/get-basket-offline-products.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasketOfflineProducts
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
    updateCheckoutServiceTypeUnavailable: {
        url: '/update-checkout-service-type-unavailable.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckoutServiceTypeUnavailable
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
    updateCheckoutGeolocationRequired: {
        url: '/update-checkout-geolocation-required.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckoutGeolocationRequired
    },
    getAddressUK: {
        url: '/uk/get-address.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getAddressUK
    },
    getAddressAU: {
        url: '/au/get-address.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getAddressAU
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
    },
    getBasketDeliveryAgeRestriction: {
        url: '/get-basket-delivery-age-restriction.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasketDeliveryAgeRestricted
    },
    getSplitNotesConfig: {
        url: '/get-notes-config-split/99999/checkout-note-types',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: splitNotesConfig
    },
    getNonSplitNotesConfig: {
        url: '/get-notes-config/99999/checkout-note-types',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: nonSplitNotesConfig
    }
};

export {
    requestDefinitions as default,
    httpMethods,
    httpStatusCodes
};
