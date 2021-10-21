export default {
    CheckoutSuccess: {
        logMessage: 'Consumer Checkout Successful',
        logMethod: 'logInfo',
        hasEventData: true
    },
    CheckoutFailure: {
        logMessage: 'Consumer Checkout Failure',
        logMethod: 'logError',
        hasEventData: true
    },
    CheckoutAddressGetFailure: {
        logMessage: 'Get Checkout Address Failure',
        logMethod: 'logWarn'
    },
    CheckoutCustomerGetFailure: {
        logMessage: 'Get Checkout Customer Failure',
        logMethod: 'logWarn'
    },
    CheckoutGeoLocationGetFailure: {
        logMessage: 'Geo Location Lookup Failed',
        logMethod: 'logWarn'
    },
    CheckoutValidationError: {
        logMessage: 'Checkout Validation Error',
        logMethod: 'logWarn'
    },
    CheckoutSetupGuestFailure: {
        logMessage: 'Checkout Setup Guest Failure',
        logMethod: 'logError',
        hasEventData: true
    },
    CheckoutUpdateSuccess: {
        hasEventData: true
    },
    CheckoutUpdateFailure: {
        logMessage: 'Consumer Update Failure',
        logMethod: 'logError',
        hasEventData: true
    },
    CheckoutNonFulfillableError: {
        logMessage: 'Consumer Checkout Not Fulfillable',
        logMethod: 'logError',
        hasEventData: true
    },
    CheckoutUpdateForbidden: {
        logMessage: 'Checkout Update Failure: Access Forbidden',
        logMethod: 'logWarn',
        hasEventData: true
    },
    CheckoutPlaceOrderSuccess: {
        hasEventData: true
    },
    CheckoutPlaceOrderFailure: {
        logMessage: 'Place Order Failure',
        logMethod: 'logError',
        hasEventData: true
    },
    CheckoutPlaceOrderDuplicateOrder: {
        logMessage: 'Place Order Duplicate Order',
        logMethod: 'logWarn',
        hasEventData: true
    },
    CheckoutGetFailure: {
        logMessage: 'Get Checkout Failure',
        logMethod: 'logWarn'
    },
    CheckoutGetForbidden: {
        logMessage: 'Get Checkout Failure: Access Forbidden',
        logMethod: 'logWarn'
    },
    CheckoutAvailableFulfilmentGetFailure: {
        logMessage: 'Get Checkout Available Fulfilment Times Failure',
        logMethod: 'logError'
    },
    CheckoutBasketGetFailure: {
        logMessage: 'Get Basket Failure',
        logMethod: 'logError'
    }
};
