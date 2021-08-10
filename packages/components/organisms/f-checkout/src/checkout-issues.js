const checkoutIssues = {
    MINIMUM_ORDER_VALUE_NOT_MET: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: true
    },

    RESTAURANT_NOT_TAKING_ORDERS: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    SERVICE_TYPE_UNAVAILABLE: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    ADDITIONAL_ITEMS_REQUIRED: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: true
    },

    ITEMS_UNORDERABLE: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: true
    },

    FULFILMENT_TIME_UNAVAILABLE: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    LOCATION_UNDELIVERABLE: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    TABLE_IDENTIFIER_REQUIRED: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    DATE_OF_BIRTH_REQUIRED: {
        shouldShowInDialog: false,
        shouldRedirectToMenu: false
    },

    GENERIC_CHECKOUT_ISSUE: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    },

    // Different casing since this issue is provided by a different API with different naming conventions
    DuplicateOrder: {
        shouldShowInDialog: true,
        shouldRedirectToMenu: false
    }
};

export default checkoutIssues;
