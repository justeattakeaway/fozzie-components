// WIP based on https://docs.google.com/spreadsheets/d/15Ah73FyH3vm-tZIU8OscV-bVj913VSPOMBZZbFG624k/edit#gid=0

// TODO: Account for translations
const checkoutIssues = {
    MINIMUM_ORDER_VALUE_NOT_MET: {
        showInDialog: true,
        shouldRedirectToMenu: true
    },

    RESTAURANT_NOT_TAKING_ORDERS: {
        showInDialog: true,
        shouldRedirectToMenu: false
    },

    SERVICE_TYPE_UNAVAILABLE: {
        showInDialog: true,
        shouldRedirectToMenu: false
    },

    ADDITIONAL_ITEMS_REQUIRED: {
        showInDialog: true,
        shouldRedirectToMenu: true
    },

    ITEMS_UNORDERABLE: {
        showInDialog: true,
        shouldRedirectToMenu: true
    },

    FULFILMENT_TIME_UNAVAILABLE: {
        showInDialog: true,
        shouldRedirectToMenu: false
    },

    LOCATION_UNDELIVERABLE: {
        showInDialog: true,
        shouldRedirectToMenu: false
    }
};

export default checkoutIssues;
