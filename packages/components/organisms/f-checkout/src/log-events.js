import EventNames from './event-names';

export default {
    CheckoutSuccess: {
        // submitOrder
        logMessage: 'Consumer Checkout Successful',
        logMethod: 'logInfo',
        eventMessage: EventNames.CheckoutSuccess,
        hasEventData: true
    },
    CheckoutFailure: {
        // handleErrorState BACKUP
        logMessage: 'Consumer Checkout Failure',
        logMethod: 'logError',
        eventMessage: EventNames.CheckoutFailure,
        hasEventData: true
    },
    CheckoutAddressGetSuccess: {
        // loadAddress
        eventMessage: EventNames.CheckoutAddressGetSuccess,
        hasEventData: false
    },
    CheckoutAddressGetFailure: {
        // loadAddress
        logMessage: 'Get Checkout Address Failure',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutAddressGetFailure,
        hasEventData: false
    },
    CheckoutCustomerGetSuccess: {
        // loadCustomer
        eventMessage: EventNames.CheckoutCustomerGetSuccess,
        hasEventData: false
    },
    CheckoutCustomerGetFailure: {
        // loadCustomer
        logMessage: 'Get Checkout Customer Failure',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutCustomerGetFailure,
        hasEventData: false
    },
    CheckoutGeoLocationGetSuccess: {
        // DOESN'T EMIT AT ALL
    },
    CheckoutGeoLocationGetFailure: {
        // lookupGeoLocation
        logMessage: 'Geo Location Lookup Failed',
        logMethod: 'logWarn'
    },
    CheckoutValidationError: {
        // onInvalidCheckoutForm
        logMessage: 'Checkout Validation Error',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutValidationError,
        hasEventData: false
    },
    CheckoutSetupGuestSuccess: {
        // setupGuestUser
        eventMessage: EventNames.CheckoutSetupGuestSuccess,
        hasEventData: false
    },
    CheckoutSetupGuestFailure: {
        // CreateGuestUserError ERROR EXCEPTION
        logMessage: 'Checkout Setup Guest Failure',
        logMethod: 'logError',
        eventMessage: EventNames.CheckoutSetupGuestFailure,
        hasEventData: true
    },
    CheckoutUpdateSuccess: {
        // handleUpdateCheckout
        eventMessage: EventNames.CheckoutUpdateSuccess,
        hasEventData: true
    },
    CheckoutUpdateFailure: {
        // handleNonFulfillableCheckout
        logMessage: 'Consumer Update Failure',
        logMethod: 'logError',
        eventMessage: EventNames.CheckoutUpdateFailure,
        hasEventData: true
    },
    CheckoutUpdateForbidden: {
        // UpdateCheckoutAccessForbiddenError ERROR EXCEPTION
        logMessage: 'Checkout Update Failure: Access Forbidden',
        logMethod: 'logWarn',
        hasEventData: true
    },
    CheckoutPlaceOrderFailure: {
        // PlaceOrderError ERROR EXCEPTION
        logMessage: 'Place Order Failure',
        logMethod: 'logError',
        eventMessage: EventNames.CheckoutPlaceOrderFailure,
        hasEventData: false
    },
    CheckoutPlaceOrderDuplicateOrder: {
        // PlaceOrderError ERROR EXCEPTION
        logMessage: 'Place Order Duplicate Order',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutPlaceOrderFailure,
        hasEventData: false
    },
    CheckoutGetSuccess: {
        // loadCheckout
        eventMessage: EventNames.CheckoutGetSuccess,
        hasEventData: false
    },
    CheckoutGetFailure: {
        // GetCheckoutError ERROR EXCEPTION
        logMessage: 'Get Checkout Failure',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutGetFailure,
        hasEventData: false
    },
    CheckoutGetForbidden: {
        // GetCheckoutAccessForbiddenError ERROR EXCEPTION
        logMessage: 'Get Checkout Failure: Access Forbidden',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutGetForbidden,
        hasEventData: false
    },
    CheckoutAvailableFulfilmentGetSuccess: {
        // loadAvailableFulfilment
        eventMessage: EventNames.CheckoutAvailableFulfilmentGetSuccess,
        hasEventData: false
    },
    CheckoutAvailableFulfilmentGetFailure: {
        // AvailableFulfilmentGetError ERROR EXCEPTION
        logMessage: 'Get Checkout Available Fulfilment Times Failure',
        logMethod: 'logWarn',
        eventMessage: EventNames.CheckoutAvailableFulfilmentGetFailure,
        hasEventData: false
    },
    CheckoutBasketGetSuccess: {
        // loadBasket
        eventMessage: EventNames.CheckoutBasketGetSuccess,
        hasEventData: false
    },
    CheckoutBasketGetFailure: {
        // GetCheckoutError ERROR EXCEPTION
        logMessage: 'Get Basket Failure',
        logMethod: 'logError',
        eventMessage: EventNames.CheckoutBasketGetFailure,
        hasEventData: false
    },
    CheckoutPlaceOrderSuccess: {
        // submitOrder
        eventMessage: EventNames.CheckoutPlaceOrderSuccess,
        hasEventData: true
    }
};
