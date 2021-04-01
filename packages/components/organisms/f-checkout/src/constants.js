export const CHECKOUT_METHOD_COLLECTION = 'collection';
export const CHECKOUT_METHOD_DELIVERY = 'delivery';

export const VALID_CHECKOUT_METHODS = [CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY];

export const TENANT_MAP = {
    'en-GB': 'uk',
    'en-AU': 'au',
    'en-NZ': 'nz',
    'da-DK': 'dk',
    'es-ES': 'es',
    'en-IE': 'ie',
    'it-IT': 'it',
    'nb-NO': 'no'
};

export const VALIDATIONS = {
    address: 'addressValidations',
    guest: 'guestValidations'
};

export const VUEX_CHECKOUT_MODULE = 'fCheckoutModule';
export const VUEX_CHECKOUT_ANALYTICS_MODULE = 'fCheckoutAnalyticsModule';

export const ERROR_CODE_FULFILMENT_TIME_INVALID = 'FULFILMENT_TIME_INVALID';
export const ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE = 'FULFILMENT_TIME_UNAVAILABLE';

export const ANALYTICS_ERROR_CODE_BASKET_NOT_ORDERABLE = 'basketNotOrderable';
export const ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE = 'invalidModelState';
export const ANALYTICS_ERROR_CODE_SET_ORDER_TIME = 'setOrderTime';
export const ANALYTICS_ERROR_CODE_INVALID_ORDER_TIME = 'invalidOrderTime';

export const DEFAULT_CHECKOUT_ISSUE = 'DEFAULT_CHECKOUT_ISSUE';
