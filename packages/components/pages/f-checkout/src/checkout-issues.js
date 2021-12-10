import { ERROR_TYPES } from './constants';

const checkoutIssues = {
    MINIMUM_ORDER_VALUE_NOT_MET: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: true
    },

    RESTAURANT_NOT_TAKING_ORDERS: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: true
    },

    SERVICE_TYPE_UNAVAILABLE: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: true
    },

    ADDITIONAL_ITEMS_REQUIRED: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: true
    },

    ITEMS_UNORDERABLE: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: true
    },

    FULFILMENT_TIME_UNAVAILABLE: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: false
    },

    LOCATION_UNDELIVERABLE: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: false
    },

    TABLE_IDENTIFIER_REQUIRED: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: false
    },

    KITCHEN_NOTE_NOT_ACCEPTED: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    ORDER_NOTE_NOT_ACCEPTED: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    COURIER_NOTE_NOT_ACCEPTED: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    GENERIC_CHECKOUT_ISSUE: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: false
    },

    DATE_OF_BIRTH_REQUIRED: {
        errorType: ERROR_TYPES.alert,
        shouldRedirectToMenu: false
    },

    GEOLOCATION_REQUIRED: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: false
    },

    // Different casing since this issue is provided by a different API with different naming conventions
    DuplicateOrder: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: false
    },

    BasketChanged: {
        errorType: ERROR_TYPES.dialog,
        shouldRedirectToMenu: true
    }
};

export default checkoutIssues;
