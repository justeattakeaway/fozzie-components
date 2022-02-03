import getCheckout from './payloads/getCheckout';
import availableFulfilmentTimes from './payloads/getAvailableTimes';
import createGuest from './payloads/createGuest.js';
import getBasket from './payloads/getBasket';
import getNotes from './payloads/getNotes.js';
import placeOrder from './payloads/placeOrder.js';
import updateCheckout from './payloads/updateCheckout.js';
import getAddress from './payloads/get-address.json';
import getGeoLocation from './payloads/get-geo-location.json';
import getCustomer from './payloads/get-customer.json';


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
        payload: getCheckout.uk.delivery
    },
    checkoutDeliverySplitNotesKitchenAndCourier: {
        url: '/uk/checkout-delivery-split-notes-courier-kitchen.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.uk.deliveryAndKitchenNoteTypes
    },
    checkoutDeliverySplitNotesCourier: {
        url: '/uk/checkout-delivery-split-notes-courier.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.uk.deliveryNoteType
    },
    checkoutDeliveryAu: {
        url: '/au/checkout-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.au.delivery
    },
    checkoutDeliveryNz: {
        url: '/nz/checkout-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.nz.delivery
    },
    checkoutDeliveryUserSelectedAsap: {
        url: '/checkout-delivery-user-selected-asap.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.deliveryUserSelectedAsap
    },
    checkoutDeliveryUserSelectedLater: {
        url: '/checkout-delivery-user-selected-later.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.deliveryUserSelectedLater
    },
    checkoutDeliveryUserSelectedUnavailableTime: {
        url: '/checkout-delivery-user-selected-time-unavailable.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.deliveryUserSelectedUnavailableTime
    },
    checkoutCollectionUk: {
        url: '/uk/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.uk.collection
    },
    checkoutCollectionAu: {
        url: '/au/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.au.collection
    },
    checkoutCollectionNz: {
        url: '/nz/checkout-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.nz.collection
    },
    checkoutCollectionUserSelectedAsap: {
        url: '/checkout-collection-user-selected-asap.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.collectionUserSelectedAsap
    },
    checkoutCollectionUserSelectedLater: {
        url: '/checkout-collection-user-selected-later.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.collectionUserSelectedLater
    },
    checkoutCollectionUserSelectedUnavailableTime: {
        url: '/checkout-collection-user-selected-time-unavailable.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.collectionUserSelectedUnavailableTime
    },
    checkoutDineinUk: {
        url: '/uk/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.uk.dinein
    },
    checkoutDineinAu: {
        url: '/au/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.au.dinein
    },
    checkoutDineinNz: {
        url: '/nz/checkout-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.nz.dinein
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
        payload: availableFulfilmentTimes.default
    },
    checkoutAvailableFulfilmentNoTimeAvailable: {
        url: '/checkout-available-fulfilment-time-unavailable.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: availableFulfilmentTimes.noTimeAvailable
    },
    checkoutAvailableFulfilmentPreorder: {
        url: '/checkout-available-fulfilment-preorder.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: availableFulfilmentTimes.preOrder
    },
    createGuest: {
        url: '/create-guest.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.ok,
        payload: createGuest.default
    },
    createGuestError: {
        url: '/create-guest-error.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.badRequest,
        payload: createGuest.error
    },
    getBasketDelivery: {
        url: '/get-basket-delivery.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasket.delivery
    },
    getBasketCollection: {
        url: '/get-basket-collection.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasket.collection
    },
    getBasketDinein: {
        url: '/get-basket-dinein.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasket.dinein
    },
    getBasketInvalidProducts: {
        url: '/get-basket-invalid-products.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasket.invalidProducts
    },
    getBasketOfflineProducts: {
        url: '/get-basket-offline-products.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getBasket.offlineProducts
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
        payload: updateCheckout.default
    },
    updateCheckoutRestaurantNotTakingOrders: {
        url: '/update-checkout-restaurant-not-taking-orders.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckout.restaurantNotTakingOrders
    },
    updateCheckoutServiceTypeUnavailable: {
        url: '/update-checkout-service-type-unavailable.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckout.serviceTypeUnavailable
    },
    updateCheckoutAdditionalItemsRequired: {
        url: '/update-checkout-additional-items-required.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckout.additionalItemsRequired
    },
    updateCheckout403: {
        url: '/update-checkout-403.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.forbidden,
        payload: updateCheckout.error
    },
    updateCheckoutTimeUnavailable: {
        url: '/update-checkout-time-unavailable.json',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.ok,
        payload: updateCheckout.noTimeAvailable
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
        payload: updateCheckout.geolocationRequired
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
        payload: placeOrder.default
    },
    placeOrderDuplicate: {
        url: '/place-order-duplicate.json',
        method: httpMethods.post,
        responseStatus: httpStatusCodes.badRequest,
        payload: placeOrder.duplicate
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
        payload: getCheckout.error403
    },
    checkout500GetError: {
        url: '/checkout-500-get-error.json',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getCheckout.error500
    },
    getGeoLocation: {
        url: '/get-geo-location.json',
        method: httpMethods.post,
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
        payload: getBasket.ageRestrictiongeRestricted
    },
    getSplitNotesConfig: {
        url: '/get-notes-config-split/99999/checkout-note-types',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getNotes.splitNotesConfig
    },
    getNonSplitNotesConfig: {
        url: '/get-notes-config/99999/checkout-note-types',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.ok,
        payload: getNotes.notesConfig
    }
};

export {
    requestDefinitions as default,
    httpMethods,
    httpStatusCodes
};
