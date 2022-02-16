export default {
    CheckoutSuccess: {
        logMessage: 'Consumer Checkout Successful',
        logMethod: 'info',
        hasEventData: true
    },
    CheckoutFailure: {
        logMessage: 'Consumer Checkout Failure',
        logMethod: 'error',
        hasEventData: true
    },
    CheckoutAddressGetFailure: {
        logMessage: 'Get Checkout Address Failure',
        logMethod: 'warn'
    },
    CheckoutCustomerGetFailure: {
        logMessage: 'Get Checkout Customer Failure',
        logMethod: 'warn'
    },
    CheckoutGeoLocationGetFailure: {
        logMessage: 'Geo Location Lookup Failed',
        logMethod: 'warn'
    },
    CheckoutValidationError: {
        logMessage: 'Checkout Validation Error',
        logMethod: 'logWarn'
    },
    CheckoutSetupGuestFailure: {
        logMessage: 'Checkout Setup Guest Failure',
        logMethod: 'error',
        hasEventData: true
    },
    CheckoutUpdateSuccess: {
        hasEventData: true
    },
    CheckoutUpdateFailure: {
        logMessage: 'Consumer Update Failure',
        logMethod: 'error',
        hasEventData: true
    },
    CheckoutNonFulfillableError: {
        logMessage: 'Consumer Checkout Not Fulfillable',
        logMethod: 'error',
        hasEventData: true
    },
    CheckoutUpdateForbidden: {
        logMessage: 'Checkout Update Failure: Access Forbidden',
        logMethod: 'warn',
        hasEventData: true
    },
    CheckoutPlaceOrderSuccess: {
        hasEventData: true
    },
    CheckoutPlaceOrderFailure: {
        logMessage: 'Place Order Failure',
        logMethod: 'error',
        hasEventData: true
    },
    CheckoutPlaceOrderDuplicateOrder: {
        logMessage: 'Place Order Duplicate Order',
        logMethod: 'warn',
        hasEventData: true
    },
    CheckoutGetFailure: {
        logMessage: 'Get Checkout Failure',
        logMethod: 'warn'
    },
    CheckoutGetForbidden: {
        logMessage: 'Get Checkout Failure: Access Forbidden',
        logMethod: 'warn'
    },
    CheckoutAvailableFulfilmentGetFailure: {
        logMessage: 'Get Checkout Available Fulfilment Times Failure',
        logMethod: 'error'
    },
    CheckoutAvailableFulfilmentEmpty: {
        logMessage: 'Available Fulfilment Times Empty',
        logMethod: 'error'
    },
    CheckoutBasketGetFailure: {
        logMessage: 'Get Basket Failure',
        logMethod: 'error'
    },
    NotesConfigurationFailure: {
        logMessage: 'Notes configuration failure',
        logMethod: 'warn'
    }
};
